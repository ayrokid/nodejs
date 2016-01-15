var express = require('express');
var router = express.Router();
var mongoose      = require('mongoose');

var jwt       = require('jsonwebtoken');
var config    = require('../config/mongo');
var User 	  = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

/* GET users listing. */
router.get('/setup', function(req, res, next) {
  var nick = new User({
  	name: 'Yanun',
  	password: 'passwordku',
  	admin: true
  });

  nick.save(function(err) {
  	if(err) throw err;

  	console.log('User saved successfully');
  	res.json({ success: true });

  });
});

/* Authenticate */
router.post('/authenticate', function(req, res) {
	
	//find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {
		if(err) throw err;

		if(!user){
			res.json({ success: false, message: 'Authentication failed. User not found.'});
		}else if(user){

			// check if password matches
			if( user.password != req.body.password ){
				res.json({ success: false, message: 'Authentication failed. Wrong Password.'});
			}else{
				//if user is found and password is right
				// create a token
				var token = jwt.sign(user, config.secret, {
					expiresInMinutes: 1440 // expires in 24 hours
				});

				//return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});

			}
		}
	});
});

router.get('/users', function(req, res, next) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

module.exports = router;
