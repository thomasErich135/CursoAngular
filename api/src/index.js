const restify = require('restify');
const Router = require('restify-router').Router;
const router = new Router();

const serverPort = 8000;
const server = restify.createServer({
    name: 'OneeWebAPI',
    version: 'v1'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res) => {
    res.json('Server Running - Ok');
});

//server.use(`/${server.version}`, require('./router.js'));
//router.add(`/v1`, require('./router.js'));

server.get('*', (req, res) => {
    res.json({
        status: '404 - Not Found :/',
        msg: 'API Works :D'
    });
});

server.listen(serverPort, (req, res) => {
    console.log(`Server is running in port: ${serverPort}`);
});