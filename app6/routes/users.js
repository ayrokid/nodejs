var express = require('express');
var router = express.Router();
var mongoose      = require('mongoose');

var jwt       = require('jsonwebtoken');
var config    = require('../config/mongo');
var User 	  = require('../models/user');

/* middleware to verify a token */
router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	//decode token
	if(token){

		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if(err){
				return res.json({ success: false, message: 'Failed to authenticate token.'});
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token
		return res.status(403).send({
			success: false,
			message: 'No token provided.!'
		});
	}
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
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

module.exports = router;
