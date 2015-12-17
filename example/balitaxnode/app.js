
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var http = require('http');
var mysql = require('mysql');

var connection = require('express-myconnection');

// Setting Main Environtmen

app.set('port',process.env.PORT || 3030);
app.use(express.logger('dev'));
app.set('views', __dirname);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(
  connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'balitax'
  },'request')
);

// 

app.use(setCurrentUrl);

function setCurrentUrl(req, res, next) {
    app.set('CURR_URL', req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
}



app.use(express.cookieParser('balitax Sedang Mainan Code, Psssstt'));
app.use(express.session());

app.use(express.json());
app.use(express.urlencoded());


app.get('/',function(req,res){    
    res.render(__dirname + '/views/index.ejs',{error_login:''});
});


var login = require('./gaus/login');
var home = require('./gaus/home');
var profil = require('./gaus/profil');
var jadwal = require('./gaus/jadwal-kegiatan');
var events = require('./gaus/events');


app.use(login);
app.use(home);
app.use(profil);
app.use(jadwal);
app.use(events);

app.use(function(req,res,fn){
  res.render('error_page', {status:404,url:req.url,error: 'Ops... Halaman Tidak Di Temukan. Maaf !'});
});

app.use(function(err, req, res, next){
  res.render('error_page', {
    status: err.status || 500,
    error: err
  });
});


app.use(app.router);

// Jalankan Server
http.createServer(app).listen(app.get('port'),function(){

    console.log('Kamu Menggunakan Port : %s  Mas', app.get('port'));
});
