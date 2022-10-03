const express = require('express');
var router=express.Router();
const mongoose = require('mongoose');
const Mesa = require('../models/Mesa');
var tabla=[], tablas=[];
router.get('/',function(req,res){
  for (var i = 0; i < 50; i++) {
    let cartaTemp={};
    cartaTemp={
      carta:[]
    };

    for (let index = 0; index < 16; index++) {
      let cartaElegida=Math.floor(Math.random()*(54)+1);
      let rutaBaraja=`assets/barajas/${cartaElegida}.jpg`;
      if (cartaTemp.carta.some(baraja=>baraja.baraja==rutaBaraja) ) {
        index--;
      }else{
        cartaTemp.carta.push({baraja:rutaBaraja,paso:false,marcada:false});
      }
    }
    tablas.push(cartaTemp);
    console.log(tablas);
  }
  mesa=Mesa({
    titulo:'Linea',
    creador:'byGeorge',
    numeroDeTablas:50,
      tipo: 0,
      bote: 0,
      entrada: 5,
    formaDeGanar:[
       'assets/img/linea.png',
      //  'assets/img/cuadrochico.png',
       //'assets/img/cuatroesquinas.png',
      //'assets/img/llena.png',
    ],
    ganador:[],
    tablas:tablas,
  });
  mesa.save();
  res.send('Crear Tablas');
});
module.exports=router;
