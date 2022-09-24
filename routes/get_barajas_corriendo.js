const express = require('express');
var router=express.Router();
var Mesa=require('../models/Mesa');
router.post('/',function(req,res,next){
  Mesa.findById(req.body.id,function(err,mesa){
    if (err) {
      return res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
    }
    return res.json({err:false,message:'Nueva baraja',corriendo:mesa.corriendo});
  })
});
module.exports=router;
