const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const MongoClient = require('mongodb').MongoClient;

const app = express();

const url = 'mongodb://127.0.0.1:27017'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const multipartMiddleware = multipart({ uploadDir: './uploads' });
app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ message: files });
})

app.get('/cursos', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.find({}).toArray((err, docs) => {
            client.close();
            res.json(docs);
        });
    });
})

app.get('/cursos/:id', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.findOne({ id: parseInt(req.params.id) }).then(result => {
            client.close();
            res.json(result);
        });
    });
})

app.put('/cursos/:id', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.updateOne({ id: parseInt(req.body['id']) }, {$set: { 'curso': req.body['curso'] }}, (err, result) => {
            client.close();
            if (err) {
                res.json({
                    code: 500,
                    message: 'Internal Server Error'
                });
                return;
            }
            if(result.modifiedCount > 0){
                res.json({
                    code: 200,
                    message: 'Ok'
                });
            } else {
                res.json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
    });
})

app.post('/cursos', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.insertOne( req.body , (err, result) => {
            client.close();
            if (err) {
                res.json({
                    code: 500,
                    message: 'Internal Server Error'
                });
                return;
            }
            if(result.insertedCount > 0){
                res.json({
                    code: 200,
                    message: 'Ok'
                });
            } else {
                res.json({
                    code: 400,
                    message: 'Bad Request'
                });
            }
        });
    });
})

app.get('/', (req, res) => {
    res.json({
        status: 'Ok',
        msg: 'Servidor Express Node.js'
    });
})

app.use((err, req, res, next) => res.json({ error: err.message }));

app.listen(8000, () => {
    console.log('Servidor Porta 8000');
})