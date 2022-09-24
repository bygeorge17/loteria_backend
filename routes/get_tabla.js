const express = require('express');
const mongoose = require('mongoose');
var router=express.Router();
var Mesa=require('../models/Mesa');
router.post('/',function(req,res,next){
    var id=mongoose.Types.ObjectId(req.body.id);
  Mesa.findById(req.body.id,function(err,mesa){
    if (err) {
      return res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde',origen:'get_tabla'});
    }
    let carta_buscada=mesa.tablas[req.body.tabla];

    return res.json({err:false,message:'Carta encontrada',carta:carta_buscada});
    });
});
module.exports=router;
