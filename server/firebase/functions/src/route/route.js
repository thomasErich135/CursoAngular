const express = require('express');
const router = express.Router();

router.use(`/cursos`, require('../cursos/cursos.js'));

module.exports = router;