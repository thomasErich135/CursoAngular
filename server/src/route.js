const express = require('express');
const apiRouter = express();

apiRouter.use('/cursos', require('./cursos.js'));

module.exports = apiRouter;