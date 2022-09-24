const mongoose = require('mongoose');
const Usuario=require('./Usuario');
const mesaSchema = mongoose.Schema({
    titulo: String,
    creador: String,
    numeroDeTablas: Number,
    jugadores: [{
        jugador:{
        type: mongoose.Schema.Types.ObjectId,
            ref: Usuario
        },
        jugando: Boolean
    }],
    corriendo: [],
    tipo: Number,
    formaDeGanar: [],
    ganador: [],
    bote: Number,
    entrada:Number,
  tablas:[{
    jugador:{
      type:mongoose.Schema.Types.ObjectId,
      ref:Usuario,
      default:null,
    },
    carta:[]
  }]
});
module.exports=mongoose.model('mesa',mesaSchema);
