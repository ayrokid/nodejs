var express = require('express');
var app = module.exports = express();
var proses = require('./proses_events');

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/events',function(req, res){


	if(!req.session.username)
		res.redirect('login');
	proses.getEvents(req,function(status,data){
		var params = {

			sess_user : (req.session.nama_lengkap) ? req.session.nama_lengkap : '',
			title : 'Event Event Saya',
			data : data,
		};

	res.render('events.ejs',params);
	});
});


// Aksi Simpan / Update Events

app.post('/events',function(req, res){
	if(!req.session.username)
		res.redirect('/login');

	proses.save(req, function(status, mgs){
		console.log("Status : %s , Pesan : %s ", status, mgs);
		res.type('json');
		if(!status)
			res.redirect('/events');

		res.redirect('/events');
	});
});

// Aksi Hapus Data

app.post('/events/del',function(req, res){
	if(!req.session.username)
		res.redirect('/login');

	proses.del_event(req, function(status, msg){
		console.log("Status : %s, Message : %s",status, msg);
		res.type('json');
		if(!status)
			res.send({status : "false"});

		res.send({status : "True"})
	});
});