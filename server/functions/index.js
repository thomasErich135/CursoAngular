//Declarações - Modulos
const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Configurações da API
const api = express();
const versionApi = 'v1';

//Mensagens padrões formatadas
const message = require('./src/shared/answers/global-msg.js');

//Configurações
/* ************************************* */

//body-parser - converte o req.body para o formato json em uma chamada post por exemplo
//content-type = application/json -> Post vindo com objeto do tipo JSON
api.use(bodyParser.json());
//content-type = application/x-www-form-urlencoded -> Post vindo de um formulario HTML
//extended true: Permite o aninhamento de objetos {"animal":{"tipo":"cachorro","raca":"vira-lata","idade":3}}
api.use(bodyParser.urlencoded({ extended: true }));

//configurações do CORS
const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200
}
api.use(cors(corsOptions));

//endpoint raiz
api.get('/', (req, res) => {
    res.json(message.messageDefault('200 - Ok', 'API Work - Server Express - Node.js'));
})

//roteamento para ../v1/
api.use(`/${versionApi}`, require("./src/route/route.js"));

//endpoint 404 - not found
api.get('*', (req, res) => {
    res.json(message.messageDefault('404 - Not Found', `The request: ${req.path} cannot be processed because the endpoint was not found.`));
});

//middleware de erro, sempre leva 4 argumentos mesmo se não usado, caso contrario sera tratado como middleware regular
api.use((err, req, res, next) => {
    res.status(500).json({ error: err.message})
});

exports.api = functions
    .region('us-east1')
    .https.onRequest(api);