var express = require('express');
var router = express.Router();
var passport      = require('passport');
var LocalStrategy 	 = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// route for home page
router.get('/', function(req, res) {
	res.render('index.ejs');
});

// route for showing the profile page 
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {
		user : req.user
	});
});

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', 
	passport.authenticate('facebook', {
		successRedirect : '/profile',
		failureRedirect : '/'
	}));

// route for logging out
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if(req.isAuthenticated()) 
		return next();

	res.redirect('/');
}


module.exports = router;
