const Router = require('restify-router').Router;
const router = new  Router();

router.get('/', (req, res) => {
    res.json({status: 'ok'});
})

module.exports = router;

