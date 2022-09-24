const express = require('express');
var router = express.Router();
var Mesa = require('../models/Mesa');
const http = require('http');

router.post('/', function (req, res) {
    console.log(req.body);
    Mesa.findById(req.body.id, function (err, mesa) {
        if (err) {
            return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
        }
        mesa.tablas.forEach(tabla => {
            if (tabla.jugador == req.body.jugador) {
                tabla.carta[req.body.baraja].paso = true;
                tabla.carta[req.body.baraja].marcada = true;
            }
            //Evaluar si la mesa se gana con linea
            if (mesa.formaDeGanar.includes('assets/img/linea.png')) {
                //Evaluar si el jugador ha formado una linea
                if (tabla.carta[0].marcada && tabla.carta[1].marcada && tabla.carta[2].marcada && tabla.carta[3].marcada
                    || tabla.carta[4].marcada && tabla.carta[5].marcada && tabla.carta[6].marcada && tabla.carta[7].marcada
                    || tabla.carta[8].marcada && tabla.carta[9].marcada && tabla.carta[10].marcada && tabla.carta[11].marcada
                    || tabla.carta[12].marcada && tabla.carta[13].marcada && tabla.carta[14].marcada && tabla.carta[15].marcada
                    || tabla.carta[0].marcada && tabla.carta[4].marcada && tabla.carta[8].marcada && tabla.carta[12].marcada
                    || tabla.carta[1].marcada && tabla.carta[5].marcada && tabla.carta[9].marcada && tabla.carta[13].marcada
                    || tabla.carta[2].marcada && tabla.carta[6].marcada && tabla.carta[10].marcada && tabla.carta[14].marcada
                    || tabla.carta[3].marcada && tabla.carta[7].marcada && tabla.carta[11].marcada && tabla.carta[15].marcada
                    || tabla.carta[0].marcada && tabla.carta[5].marcada && tabla.carta[10].marcada && tabla.carta[15].marcada
                    || tabla.carta[3].marcada && tabla.carta[6].marcada && tabla.carta[9].marcada && tabla.carta[12].marcada
                ) {
                    registrarGanador(mesa);

                }
            }
            if (mesa.formaDeGanar.includes('assets/img/cuadrochico.png')) {
                if (tabla.carta[5].marcada && tabla.carta[6].marcada && tabla.carta[9].marcada && tabla.carta[10].marcada) {
                    registrarGanador(mesa);
                }
            }
            if (mesa.formaDeGanar.includes('assets/img/cuatroesquinas.png')) {
                if (tabla.carta[0].marcada && tabla.carta[6].marcada && tabla.carta[12].marcada && tabla.carta[15].marcada) {
                    registrarGanador(mesa);
                }
            }
            if (mesa.formaDeGanar.includes('assets/img/llena.png')) {
                if (tabla.carta[0].marcada && tabla.carta[1].marcada && tabla.carta[2].marcada && tabla.carta[3].marcada
                    && tabla.carta[4].marcada && tabla.carta[5].marcada && tabla.carta[6].marcada && tabla.carta[7].marcada
                    && tabla.carta[8].marcada && tabla.carta[9].marcada && tabla.carta[10].marcada && tabla.carta[11].marcada
                    && tabla.carta[12].marcada && tabla.carta[13].marcada && tabla.carta[14].marcada && tabla.carta[15].marcada
                    ) {
                    registrarGanador(mesa);
                }
            }
        });
        let marcada = Mesa(mesa);
        marcada.save(function (err, guardada) {
            if (err) {
                return res.json({ err, message: 'Algo salio mal, por favor intente de nuevo mas tarde' });
            }
            return res.json({ err: false, message: 'La baraja se ha marcado' });
        });
    });
    function registrarGanador(mesa) {
        let dataGanador = JSON.stringify({
            id: mesa._id,
            jugador: req.body.jugador
        });
        let optionsGanador = {
            hostname: '172.21.216.116',
            port: 3000,
            path: '/registrar_ganador',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataGanador.length,
            },
        };
        const registrarGanador = http.request(optionsGanador, res => {
            res.on('data', data => {
                process.stdout.write(data);
            })
        });
        registrarGanador.write(dataGanador);
        registrarGanador.end();
    }
});
module.exports = router;