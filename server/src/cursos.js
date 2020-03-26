const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const multipart = require('connect-multiparty');

const url = 'mongodb://thomas:th906354@127.0.0.1:27017/test';

router.get('/', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.find({}).toArray((err, docs) => {
            client.close();
            res.json(docs);
        });
    });
});

router.post('/', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        getNextSequenceValue('cursoId').then(result => {

            req.body.id = result;
            console.log(req.body);
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
        }).catch(err => {
            console.log(`catch => ${err}`);
        });
    });
});

router.get('/:id', (req, res) => {
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
});

router.put('/:id', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        const db = client.db('test');
        const collection = db.collection('cursos');
        collection.updateOne({ id: parseInt(req.params['id']) }, { $set: { 'curso': req.body['curso'] } }, (err, result) => {
            client.close();
            if (err) {
                res.json({
                    code: 500,
                    message: 'Internal Server Error'
                });
                return;
            };
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
            };
        });
    });
});

router.delete('/:id', (req, res) => {
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
});

function getNextSequenceValue(sequenceName) {
    return new Promise((resolve, reject) => {

        MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
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
                { 'returnOriginal': false }
            ).then(result => {
                resolve(result.value.sequenceValue);
            }).catch(
                err => reject(err)
            ).finally(
                () => client.close()
            );
        });

    });
};

const multipartMiddleware = multipart({ uploadDir: './uploads' });
router.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log(files);
    res.json({ message: files });
})

module.exports = router;