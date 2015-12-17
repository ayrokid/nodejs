var express = require('express');
var app = module.exports = express();
var proses = require('./proses_home');

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/home',function(req, res){

	if(!req.session.username)
		res.redirect('login');
	res.render('home.ejs',{
		sess_user : (req.session.nama_lengkap) ? req.session.nama_lengkap : ''
	});
});