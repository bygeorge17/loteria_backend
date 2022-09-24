var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.json({ data: { message: 'Hola Mundo' } });
});
router.post('/', function (req, res, next) {
    res.json({ message: 'Hola Mundo' });
});
module.exports = router;
