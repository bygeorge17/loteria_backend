const express = require('express');
var router=express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
router.post('/',function(req,res,next){
  Usuario.find({usuario:req.body.usuario},function(err,usuario){
    if (err) {
      res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
    }
    if (usuario) {
      res.json({err:false,usuarioDuplicado:true,message:'El correo electronico que intenta usar ya esta registrado en nuestra base de datos, por favor intente con un correo diferente'});
    }
    bcrypt.hash(req.body.password,10,function(err,hash){
      if (err) {
        res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
      }
      Usuario.findByIdAndModify(req.body.id,({
        usuario:req.body.usuario,
        password:hash,
        nick:req.body.nick,
        fichas:req.body.fichas,
        tipo:1,
        avatar:req.body.avatar
      })).exec(function(err,usuario){
        if (err) {
          res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde'});
        }
        res.json({err:false,message:'Usuario modificado con exito',usuario});
      });
    });
  })
});
module.exports=router;
