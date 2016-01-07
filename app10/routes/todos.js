var express = require('express');
var router  = express.Router();

/* GET book page */

router.get('/get', function(req, res, next) {
	var db = req.db;
	db.query('SELECT * FROM todos', function(err, results, fields) {
		if(err) {
			res.send('error in database');
		}else{
			res.json(results);
		}
	});
});

router.post('/post', function(req, res, next) {
	var db = req.db;
	var input   = JSON.parse(JSON.stringify(req.body));
	var data = {
		note	: input.note
	};
	db.query('insert into todos set ?', [data], function(err, row, fields) {
		if(err) {
			res.send('error in database');
		}else{
			db.query('SELECT * FROM todos', function(err, results, fields) {
				if(err) {
					res.send('error in database');
				}else{
					res.json(results);
				}
			});
		}
	});
});

module.exports = router;