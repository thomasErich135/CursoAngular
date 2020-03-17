const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;
const versionApi = 'v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({
        status: 'Ok',
        msg: 'Servidor Express Node.js'
    });
})

app.use(`/${versionApi}`, require("./route.js"));

//app.use(`/${versionApi}/cursos`, require('./cursos.js'));

app.get('*', (req, res) => {
    res.json({
        status: '404 - Not Found :/',
        msg: 'App Works :D'
    });
});

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(port, () => {
    console.log('Servidor Porta 8000');
});