const express = require('express');
var router=express.Router();
var Mesa=require('../models/Mesa');
router.get('/',function(req,res,next){
    Mesa.find({tipo:0},function(err,mesas){
    if (err) {
      res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
    }
    res.json({err:false,message:'Informacion recuperada correctamente',mesas});
  });
});
module.exports=router;
