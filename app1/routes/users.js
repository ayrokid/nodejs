var express = require('express');
var router  = express.Router();

var User = require('../controllers/users.controller.js');
var UserController = new User();

/* GET users listing. */
router.get('/', function(req, res) {

	UserController.all(function(result) {
		//callback(result);
		//res.json(result);
		res.render('pages/users', {title:'Users - Node.js', data:result.result});
	})
	/*
  	pool.getConnection(function(err, connection){
		connection.query('select * from users', function(err, rows){
			if(err)
				console.log('Error Selecting : %s', err);

			res.render('pages/users', {title:'Users - Node.js', data:rows});
		});
	});
	*/
});

module.exports = router;