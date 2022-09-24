const express = require('express');
var router = express.Router();
var Usuario = require('../models/Usuario');

router.post('/', function (req, res) {
    Usuario.findByIdAndUpdate(req.body.id, { marcador: req.body.marcador }, function (err, usuario) {
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        return res.json({ err: false, message: 'El marcador se ha actualizado correctamente' });
    });
});
module.exports = router;