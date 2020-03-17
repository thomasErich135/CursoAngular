const express = require('express');
const router = express.Router();

router.use(`/cursos`, require('./cursos.js'));

module.exports = router;