const mongoose = require('mongoose');
var db=mongoose.connection;
db.on('error',function(err){
  console.log(err);
});
db.once('open',function(){
  console.info('Conectado a mongoDB.');
});
mongoose.connect("mongodb://localhost:27017/loteria", { useNewUrlParser: true,useUnifiedTopology: true });
