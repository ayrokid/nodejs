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
  res.json({ message: 'Welcome to Home the coolest API on earth!' });
});

module.exports = router;