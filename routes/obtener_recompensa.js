const express = require('express');
var router = express.Router();
var Jugador = require('../models/Usuario');
router.post('/', function (req, res) {
    Jugador.findByIdAndUpdate(req.body.jugador, { $inc: { fichas: 15 } }, function (err, usuario) {
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        console.log(usuario);
        return res.json({ err: false, message: 'Se ha actualizado la recompenza' });
    })
});
module.exports = router;