const express = require('express');
const router = express.Router();

//router.use(`/cursos`, require('./cursos.js'));

router.get('/', (req, res) => {
    res.json({status: 'route ok'})
})

module.exports = router;