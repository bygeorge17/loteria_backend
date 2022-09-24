const express = require('express');
var router=express.Router();
var Mesa=require('../models/Mesa');
router.post('/',function(req,res,next){
  Mesa.findByIdAndUpdate(req.body.id,{$push:{corriendo:req.body.baraja}}).exec(function(err,mesa){

    if (err) {
      return res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
    }
    res.io.sockets.in('mesa-'+req.body.id).emit('nuevaBaraja',req.body.baraja);
    return res.json({err:false,message:'Nueva figura ha pasado'})
  });
});
module.exports=router;
