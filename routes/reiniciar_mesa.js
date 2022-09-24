const { log } = require('debug');
const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
router.post('/', function (req, res) {

    Mesa.findById(req.body.id).exec(function (err, mesa) {
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        mesa.tablas.forEach(element => {
            element.carta.forEach(carta => {
                carta.paso = false;
            });
        });
        mesa.jugadores.forEach(jugador => {
            jugador.jugando = false;

        });
        mesa.corriendo = [];
        mesa.ganador = [];
        mesa.bote = 0;
        mesa.tablas.forEach(tabla => {
            tabla.carta.forEach(carta => {
                carta.paso = false;
                carta.marcada = false;
            });
        });
        let mesaUpdated = Mesa(mesa);
        Mesa.findByIdAndUpdate(mesa._id, mesaUpdated).exec( function (err, saved) {
            console.log('Actualizando Ganador');
            if (err) {
                return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
            }
            res.io.sockets.in('mesa-'+req.body.id).emit('reinicio', '');
            
            return res.json({ err: false, message: 'La mesa se ha reiniciado correctamente' });
        });
    });
});
module.exports = router;