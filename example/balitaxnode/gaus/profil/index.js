var express = require('express');
var app = module.exports = express();
var proses = require('./proses_profil');

app.set('views', __dirname);
app.set('view engine', 'ejs');

var hash = require('../../pass').hash;

app.get('/profil',function(req, res){


	if(!req.session.username)
		res.redirect('login');
	res.render('profil.ejs',{
		sess_user : (req.session.nama_lengkap) ? req.session.nama_lengkap : '',
		title : 'Pengaturan Profil',
		user_id : req.session.user_id,
		nama_lengkap : req.session.nama_lengkap,
		email : req.session.email,
		username : req.session.username,
	});
});

app.post('/profil/save',function(req, res){
	if(!req.session.username)
		res.redirect('/login');

	proses.update(req,hash,function(status,msg){
		console.log('Status : %s, message : %s, status, msg');
		res.type('json');
		if(status == 'true'){
            res.redirect('/profil');
		}
		else {
            res.redirect('/profil');
		}
	});
});