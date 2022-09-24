const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Mesa = require('../models/Mesa');
router.post('/',function(req,res,next){
  console.log('Elegir Tabla');
  if (req.body.id=='') {
    return res.json({err:true,message:'Se necesita un ID'});
  }
  var jugador = mongoose.Types.ObjectId(req.body.jugador);
  Mesa.findById(req.body.id).exec(function(err,doc){
    if (err) {
      return res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde',origen:'elegirtabla'});
    }
    doc.tablas.forEach((item, i) => {
      if (item.jugador!=null && item.jugador!='') {
        if (item.jugador.equals(jugador)) {
          doc.tablas[i].jugador=null
        }
      }
    });
    doc.tablas.forEach((item, i) => {
      let sondiferentes=false;
      item.carta.forEach((baraja,j)=>{
        if (baraja.baraja!=req.body.tabla[j].baraja) {
          sondiferentes=true;
        }
      })
      if (!sondiferentes) {
        doc.tablas[i].jugador=req.body.jugador;
      }
    });
    var mesa=Mesa(doc);
    mesa.save(function(err,mesaUpdated){
      if (err) {
        return res.json({err,message:'Algo salio mal, por favor intente de nuevo mas tarde',origen:'eliminando tabla anterior'});
      }
      return res.json({err:false,message:'Se ha elegido la tabla correctamente'});
    })
  });
});
module.exports=router;
