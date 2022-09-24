const { log } = require('debug');
const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
router.post('/', function (req, res, next) {
    Mesa.find({ tipo: 1,creador:req.body.jugador }, function (err, mesas) {
        if (err) {
            res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        res.json({ err: false, message: 'Informacion recuperada correctamente', mesas });
    });
});
module.exports = router;
