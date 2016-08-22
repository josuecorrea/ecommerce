var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://localhost/ecommerce', function(err){
  if(err){
    console.log('Erro ao conectar com o mongo');
  }else{
    console.log('Conectado com sucesso!');
  }
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));
app.engine('ejs', ejsmate);
app.set('view engine','ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, function (err) {
     if(err)throw err;
     console.log('Online na porta: 3000' );
});