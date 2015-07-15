var express = require('express');
var app = module.exports = express();
var proses = require('./proses_jadwal');

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/jadwal-kegiatan',function(req, res){


	if(!req.session.username)
		res.redirect('login');


	proses.getJadwal(req,function(status,data){
		var params = {

			sess_user : (req.session.nama_lengkap) ? req.session.nama_lengkap : '',
			title : 'Jadwal Kegiatan Saya',
			data : data,
		};

	res.render('jadwal.ejs',params);
	});

});

// Aksi Simpan / Update Jadwal Kegiatan

app.post('/jadwal-kegiatan',function(req, res){
	if(!req.session.username)
		res.redirect('/login');

	proses.save(req, function(status, mgs){
		console.log("Status : %s , Pesan : %s ", status, mgs);
		res.type('json');
		if(!status)
			res.redirect('/jadwal-kegiatan');

		res.redirect('/jadwal-kegiatan');
	});
});

// Aksi Hapus Data

app.post('/jadwal-kegiatan/del',function(req, res){
	if(!req.session.username)
		res.redirect('/login');

	proses.del_jadwal(req, function(status, msg){
		console.log("Status : %s, Message : %s",status, msg);
		res.type('json');
		if(!status)
			res.send({status : "false"});

		res.send({status : "True"})
	});
});