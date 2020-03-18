const Router = require('restify-router').Router;
const router = new Router();

//router.add('/cursos', require('./cursos.js'));

router.get('/', (req, res) => {
    res.json({status: 'route ok '});
})


module.exports = router;

