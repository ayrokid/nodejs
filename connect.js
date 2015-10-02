var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/beardb');

//var db = mongoose.connect('mongodb://192.168.3.167/27017/sso_comment');

mongoose.connection.once('connected', function(){
	console.log('Database connected successfully');
	});
