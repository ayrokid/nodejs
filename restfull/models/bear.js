// app/models/bear.js

var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var BearSchema	= new Schema({
	nama: String,
	phone: String
});

module.exports 	= mongoose.model('Bear', BearSchema); 