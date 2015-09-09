var express = require('express');
var router  = express.Router();

var User = require('../controllers/users.controller.js');
var UserController = new User();

/* GET users listing. */
router.get('/', function(req, res) {

	UserController.all(function(result) {
		res.render('pages/users', {title:'Users - Node.js', data:result.result});
	});

});

router.get('/edit/:user_id', function(req, res) {
	var user_id =  req.params.user_id;

	UserController.getUser(user_id, function(result) {
		res.render('pages/userEdit', {title:'Edit Users - Node.js', data:result.result});
	});

});

router.post('/edit/:user_id', function(req, res) {
	var user_id = req.params.user_id;
	var input   = JSON.parse(JSON.stringify(req.body));

	UserController.save_edit(input, user_id, function(result) {
		res.redirect('/users');
	});

});

router.get('/new', function(req, res) {
	res.render('pages/userNew', {title: 'New User - Node.js'});
});

router.post('/new', function(req, res) {
	var input   = JSON.parse(JSON.stringify(req.body));

	UserController.save(input, function(result) {
		res.redirect('/users');
	});

});

router.get('/delete/:user_id', function(req, res) {
	var user_id = req.params.user_id;

	UserController.delete(user_id, function(result) {
		res.redirect('/users');
	});

});

module.exports = router;