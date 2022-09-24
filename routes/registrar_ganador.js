const { log } = require('debug');
const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
var Usuario = require('../models/Usuario');
router.post('/', function (req, res) {
    let ganadorAux;
    Mesa.findByIdAndUpdate(req.body.id, { $push: { ganador: req.body.jugador } }, function (err, mesa) {
        if (err) {
            return res.json({ err, message: 'Algo Salio mal, por favor intente de nuevo' });
        }
        Usuario.findById(req.body.jugador, function (err, ganador) {
            console.log(ganador);
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        ganador.fichas = ganador.fichas + mesa.bote;
        let jugadorM = Usuario(ganador);
        jugadorM.save(function (err, g) {
            if (err) {
                return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
            }
        });
        let nick = ganador.nick;
        res.io.sockets.in('mesa-'+req.body.id).emit('ganador', nick);
        return res.json({ err: false, message: 'Esta mesa ya tiene ganador', ganador });
    });
    });
 });
    module.exports = router;