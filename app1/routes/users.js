var express = require('express');
var router  = express.Router();

/* MySQL connection */
var pool  = require("../config/database.conf.js").database_conf;

/* GET users listing. */
router.get('/', function(req, res) {
  	pool.getConnection(function(err, connection){
		connection.query('select * from users', function(err, rows){
			if(err)
				console.log('Error Selecting : %s', err);

			res.render('pages/users', {title:'Users - Node.js', data:rows});
		});
	});
});

router.get('/edit/:user_id', function(req, res) {
	var user_id =  req.params.user_id;
  	pool.getConnection(function(err, connection){
		connection.query("select * from users where user_id = ? ",[user_id], function(err, rows){
			if(err)
				console.log('Error Selecting : %s', err);

			res.render('pages/userEdit', {title:'Edit Users - Node.js', data:rows});
		});
	});
});

router.post('/edit/:user_id', function(req, res) {
	var user_id =  req.params.user_id;

  	var input = JSON.parse(JSON.stringify(req.body));
  	// var_dump(input);
  	res.json(input);
});

module.exports = router;
