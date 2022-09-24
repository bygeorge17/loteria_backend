const mongoose = require('mongoose');
const UsuarioSchema=mongoose.Schema({
  usuario:String,
  password:String,
    nick: String,
  marcador:String,
  fichas:Number,
  tipo:Number,
  avatar:String
});
module.exports=mongoose.model('usuario',UsuarioSchema);
