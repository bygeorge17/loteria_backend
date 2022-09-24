const express = require('express');
var router=express.Router();
var Mesa=require('../models/Mesa');
router.post('/',function (req,res,next){
  Mesa.findById(req.body.id,function(err,mesa){
    if (err) {
      return res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
    }
    let jugadorYaRegistrado=false;
    mesa.jugadores.forEach((item, i) => {
      if (item.jugador==req.body.jugador.id) {
        jugadorYaRegistrado=true;
      }
    });

    if (jugadorYaRegistrado){
      console.log('El usuario ya estaba registrado');
      return res.json({err:false,message:'El usuario ya estaba registrado'});
    }
      Mesa.findByIdAndUpdate(req.body.id, { $push: { jugadores: {jugador: req.body.jugador,jugando:false }}}).exec(function(err,mesa){
    console.log('Registrando Jugador');
    if (err) {
      console.log('Error');
      console.log(err);
      return res.json({err,message:'Algo Salio Mal, por favor intente de nuevo mas tarde'});
    }
    console.log('Jugador registrado');
    return res.json({err:false,message:'Jugador registrado en la mesa',mesa})
  });
});
});
module.exports=router;
