const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
router.post('/', function(req, res){
    Mesa.findById(req.body.id, function (err, mesa) {
        let encontrado = false;
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intende de nuevo mas tarde' });
        }
        mesa.tablas.forEach((tabla, index) => {
            if (tabla.jugador == req.body.jugador) {
                encontrado = true;
                mesa.tablas[index].jugador = null;
            }
        });
        if (!encontrado) {
            return res.json({ err: false, message: 'No estaba registrado en esta mesa' });
        }
        let newMesa = Mesa(mesa);
        newMesa.save(function(err, mesaSaved){
            if (err) {
                return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
            }
            return res.json({ err: false, message: 'Has dejado la mesa exitosamente' });
        });
    });
});
module.exports = router;