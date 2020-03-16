const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const multipart = require('connect-multiparty');

const url = 'mongodb://127.0.0.1:27017'

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
            if (result) {
                res.json(result);
            } else {
                res.json([]);
            }
        });
    });
})

app.put('/cursos/:id', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.updateOne({ id: parseInt(req.body['id']) }, { $set: { 'curso': req.body['curso'] } }, (err, result) => {
            client.close();
            if (err) {
                res.json({
                    code: 500,
                    message: 'Internal Server Error'
                });
                return;
            }
            if (result.modifiedCount > 0) {
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
        collection.insertOne(req.body, (err, result) => {
            client.close();
            if (err) {
                res.json({
                    code: 500,
                    message: 'Internal Server Error'
                });
                return;
            }
            if (result.insertedCount > 0) {
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

app.delete('/cursos/:id', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.deleteOne({ id: parseInt(req.params.id) }, (err, result) => {
            client.close();
            if (err) {
                res.json({
                    code: 500,
                    message: 'Internal Server Error'
                });
                return;
            }
            if (result.deletedCount > 0) {
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

async function getNextSequenceValue(sequenceName) {    
    var ret;
    await MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');

        db.listCollections({ name: 'counters' }).toArray((err, result) => {
            if (err) {
                throw 'error in list collections';
            };
            if (result.length == 0) {
                db.createCollection('counters');
            };
        });

        const collection = db.collection('counters');

        collection.findOne({ id: sequenceName }).then(result => {
            if (!result) {
                collection.insertOne({
                    id: sequenceName,
                    sequenceValue: 0
                });
            };
        }).catch(err => console.log(err));

        collection.findOneAndUpdate(
            { id: sequenceName },
            { $inc: { sequenceValue: 1 } },
            { 'returnNewDocument': true }
        ).then(result => {
            console.log(result.value.sequenceValue);
            return (ret = result.value.sequenceValue);
        }).catch(
            err => console.log(err)
        ).finally(
            () => client.close()
        );
    });

    return ret;
};

app.get('/test', (req, res) => {
    const sequenceName = 'cursoId';
    let teste = getNextSequenceValue(sequenceName).then(result => {
        console.log(result);
    });
    // console.log(teste);
    res.json(teste);
});

module.exports = app;