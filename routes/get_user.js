const express = require('express');
var router=express.Router();
var Usuario=require('../models/Usuario');
router.post('/',function (req,res,next){
  Usuario.findById(req.body.id,function(err,usuario){
    if (err) {
      res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
    }
    res.json({err:false,message:'Consulta realizada con exito',usuario});
  });
});
module.exports=router;
