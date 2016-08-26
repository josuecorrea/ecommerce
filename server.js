var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');

var secret = require('./config/secret');
var User = require('./models/user');

var app = express();

mongoose.connect(secret.database, function(err){
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
app.use(cookieParser());
app.use(session({resave:true, saveUninitialized:true, secret: secret.secretKey, store: new MongoStore({url: secret.database, autoReconnect:true})}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

app.engine('ejs', ejsmate);
app.set('view engine','ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(secret.port, function (err) {
     if(err)throw err;
     console.log('Online na porta: ' + secret.port);
});