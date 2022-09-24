const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
var tabla = [], tablas = [];

router.post('/', function (req, res) {
    for (var i = 0; i < req.body.numeroDeTablas; i++) {
        let cartaTemp = {};
        cartaTemp = {
            carta: []
        };

        for (let index = 0; index < 16; index++) {
            let cartaElegida = Math.floor(Math.random() * (54) + 1);
            let rutaBaraja = `assets/barajas/${cartaElegida}.jpg`;
            if (cartaTemp.carta.some(baraja => baraja.baraja == rutaBaraja)) {
                index--;
            } else {
                cartaTemp.carta.push({ baraja: rutaBaraja, paso: false });
            }
        }
        tablas.push(cartaTemp);
    }
    let crearMesa = Mesa({
        titulo: req.body.titulo,
        creador: req.body.creador,
        numeroDeTablas: req.body.numeroDeTablas,
        formaDeGanar: req.body.formasDeGanar,
        tipo: 1,
        bote: 0,
        entrada: 5,
        ganador: [],
        tablas:tablas
    });
    crearMesa.save(function (err, mesa) {
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        return res.json({ err: false, message: 'La mesa privada se ha creado correctamente', mesa });
    });
});
module.exports = router;