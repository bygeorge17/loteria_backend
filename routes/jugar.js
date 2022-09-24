const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
var Jugador = require('../models/Usuario');
router.post('/', function (req, res) {

    console.log(req.body);
    Mesa.findById(req.body.id, function (err, mesa) {
        console.log('mesa.findbyid err:');
        console.log(err);
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        mesa.jugadores.forEach(jugador => {
            if (jugador.jugador == req.body.jugador) {
                jugador.jugando = true;
            }
        });
        mesa.bote = mesa.bote + 5;
        let mesaMod = Mesa(mesa);
        Jugador.findById(req.body.jugador, function (err, jugador) {
            console.log('jugador.findbyid err:');
            console.log(err);
            if (err) {
                return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
            }
            let fichasJ = jugador.fichas;
            fichasJ -= 5;
            jugador.fichas=fichasJ;
            let jugadorMod = Jugador(jugador);
            jugadorMod.save(function (err) {
                if (err) {
                    return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
                }
            })
        });
        mesaMod.save(function (err, mesaupdated) {
            console.log('mesamod.save err');
            console.log(err);
            if (err) {
                return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
            }
            res.io.sockets.in(req.body.id).emit('nuevoJugador');
            return res.json({ err: false, message: 'El jugador ha decidido jugar' });
        });
    });
});
module.exports = router;