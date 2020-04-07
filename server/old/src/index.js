//Declarações - Modulos
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Configurações da API
const app = express();
const port = process.env.PORT || 8000;
const versionApi = 'v1';

//Mensagens padrões formatadas
const message = require('./shared/respostas-padroes/global-mgs.js');

//Configurações
/* ************************************* */

//body-parser - converte o req.body para o formato json em uma chamada post por exemplo
//content-type = application/json -> Post vindo com objeto do tipo JSON
app.use(bodyParser.json());
//content-type = application/x-www-form-urlencoded -> Post vindo de um formulario HTML
//extended true: Permite o aninhamento de objetos {"animal":{"tipo":"cachorro","raca":"vira-lata","idade":3}}
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//endpoint raiz
app.get('/', (req, res) => {
    res.json(message.messageDefault('200 - Ok', 'API Work - Server Express - Node.js'));
})

//roteamento para ../v1/
app.use(`/${versionApi}`, require("./route.js"));

//endpoint 404 - not found
app.get('*', (req, res) => {
    res.json(message.messageDefault('404 - Not Found', `The request: ${req.path} cannot be processed because the endpoint was not found.`));
});

//middleware de erro, sempre leva 4 argumentos mesmo se não usado, caso contrario sera tratado como middleware regular
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message})
});

//definição de porta e mensagem log de inicialização do servidor.
app.listen(port, () => {
    console.log('Servidor Porta 8000');
});