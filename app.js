var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const http = require('http');
var logger = require('morgan');
const socketio = require('socket.io');
const cors = require('cors');
var app = express();
var corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}

app.use(cors(corsOptions));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var crearTablasPublicas = require('./routes/crearTablasPublicas');
var getmesa = require('./routes/getmesa');
var new_user_temp = require('./routes/new_user_temp');
var update_user = require('./routes/update_user');
var get_user = require('./routes/get_user');
var getmesas = require('./routes/getmesas');
var registrar_en_mesa = require('./routes/registrar_en_mesa');
var corriendo = require('./routes/corriendo');
var get_barajas_corriendo = require('./routes/get_barajas_corriendo');
var elegirtabla = require('./routes/elegirtabla');
var get_tabla = require('./routes/get_tabla');
var cambiar_nick = require('./routes/cambiar_nick');
var cambiar_avatar = require('./routes/cambiar_avatar');
var reiniciar_mesa = require('./routes/reiniciar_mesa');
var registrar_ganador = require('./routes/registrar_ganador');
var marcar = require('./routes/marcar');
var cambiar_marcador = require('./routes/cambiar_marcador');
var jugar = require('./routes/jugar');
var crear_mesa = require('./routes/crear_mesa');
var get_mesas_privadas = require('./routes/get_mesas_privadas');
var dejar_mesa = require('./routes/dejar_mesa');
var obtener_recompensa = require('./routes/obtener_recompensa');



const { log } = require('console');
const { Router } = require('express');

const server=require('http').createServer(app);
var io = socketio(server, {

  corsOptions,
  allowEIO3: true // false by default
});

io.on('connection', (socket) => {
        socket.on('unirseamesa', (mesa) => {
            socket.join('mesa-' + mesa);
            console.log(io.sockets.adapter.rooms);
            socket.emit('joined', mesa);
        });
    socket.on('leave', (mesa) => {
        socket.leave('mesa-' + mesa);
    })
    socket.emit('fromServer', 'conectado');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next){
res.io = io;
next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getmesa', getmesa);
// app.use('/crearTablasPublicas', crearTablasPublicas);
app.use('/new_user_temp', new_user_temp);
app.use('/update_user', update_user);
app.use('/get_user', get_user);
app.use('/getmesas', getmesas);
app.use('/registrar_en_mesa', registrar_en_mesa);
app.use('/corriendo', corriendo);
app.use('/get_barajas_corriendo', get_barajas_corriendo);
app.use('/elegirtabla', elegirtabla);
app.use('/get_tabla', get_tabla);
app.use('/cambiar_nick', cambiar_nick);
app.use('/cambiar_avatar', cambiar_avatar);
app.use('/reiniciar_mesa', reiniciar_mesa);
app.use('/registrar_ganador', registrar_ganador);
app.use('/marcar', marcar);
app.use('/cambiar_marcador', cambiar_marcador);
app.use('/jugar', jugar);
app.use('/crear_mesa', crear_mesa);
app.use('/get_mesas_privadas', get_mesas_privadas);
app.use('/dejar_mesa', dejar_mesa);
app.use('/obtener_recompensa', obtener_recompensa);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

require('./lib/conectar');



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const  barajar=function () {
    cartas = [];
    for (let i = 1; i <= 54; i++) {
            cartas.push(i);
    }
    return cartas;
}

let mazos = [];
let contadores = [];
const Mesa = require('../loteria_backend/models/Mesa.js');
const Jugador = require('../loteria_backend/models/Usuario.js');
let swithces = [];
setInterval(function () {
    correr();
}, 2500);
function correr() {
    Mesa.find({ tipo: 0 }, function (err, mesas) {
        if (contadores.length == 0) {
            for (let i = 0; i < mesas.length; i++) {
                contadores.push(0);
            }
        }
        if (swithces.length == 0) {
            for (let i = 0; i < mesas.length; i++) {
                swithces.push(true);
            }
        }
        if (mazos.length == 0) {
            for (let i = 0; i < mesas.length; i++) {
                mazos.push([]);
            }
        }
        for (let indice = 0; indice < mesas.length; indice++) {
            if (swithces[indice]) {
                //Barajar
                if (mazos[indice].length == 0 && contadores[indice] == 0) {
                    mazos[indice] = barajar();
                }
                //Set terminaron las cartas o se encontro un ganador
                if (mazos[indice].length == 0 || mesas[indice].ganador.length > 0) {
                    //Se reinicializan los datos de la mesa actual
                    let dataReinicio = JSON.stringify({
                        id: mesas[indice]._id
                    });
                    let optionsReinicio = {
                        hostname: 'http://137.184.151.96',
                        port: 3000,
                        path: '/reiniciar_mesa',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': dataReinicio.length,
                        },
                    };
                    const reiniciarMesa = http.request(optionsReinicio, res => {
                        res.on('data', data => {
                            process.stdout.write(data);
                        })
                    });
                    reiniciarMesa.write(dataReinicio);
                    reiniciarMesa.end();
                    //Se detiene el juego actual
                    stopCorriendo(indice);
                    console.log('Nuevo Juego');
                }
                //Se selecciona una baraja nueva al azar
                let actual = Math.floor(Math.random() * mazos[indice].length);
                //Se lanza la baraja seleccionada
                let dataCorriendo = JSON.stringify({
                    baraja: String(mazos[indice][actual]),
                    id: mesas[indice]._id
                });
                let optionsCorriendo = {
                    hostname: 'http://137.184.151.96',
                    port: 3000,
                    path: '/corriendo',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': dataCorriendo.length,
                    },
                };
                const corriendo = http.request(optionsCorriendo, res => {
                    res.on('data', data => {
                        process.stdout.write(data);
                    })
                });
                corriendo.write(dataCorriendo);
                corriendo.end();
                //La baraja que se lanzo se elimina del mazo
                mazos[indice].splice(actual, 1);
                contadores[indice]++;
                console.log(contadores[indice]);


            };
        }
    });
}


function stopCorriendo(indice) {
    console.log('Se acabo');
    swithces[indice] = false;
    setTimeout(() => {
        contadores[indice] = 0;
        mazos[indice] = [];
        swithces[indice] = true;
    }, 90000)
}
module.exports = {app:app,server:server};
