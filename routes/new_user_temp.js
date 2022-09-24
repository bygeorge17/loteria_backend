const express = require('express');
var router=express.Router();
const Usuario=require('../models/Usuario');
router.get('/',function(req,res,next){
  usuario=Usuario({
    usuario:'',
    password:'',
    nick:'Jugador',
    fichas:25,
    tipo:0,
      avatar: 'assets/avatars/man1.png',
      marcador:'assets/marcadores/star.png'
  });
  usuario.save(function(err,usuario){
    if (err) {
      res.json({err,message:'Ocurrio un error por favor vuelva mas tarde'});
    }
    res.json({err:false,message:'Usuario Temporal Creado con Exito',usuario});
  });
});
module.exports=router;
