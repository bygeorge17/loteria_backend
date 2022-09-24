const express = require('express');
var router=express.Router();
var mesa=require('../models/Mesa');
router.post('/',function(req,res,next){
    mesa.findById(req.body.id).populate('tablas.jugador').exec(function(err,mesa){
    if (err) {
      return res.json({err,message:'Ha ocurrido un error, por favor intente mas tarde'});
    }
    return res.json({err:false,mesa});
  });
});
module.exports=router;
