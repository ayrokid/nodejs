var express = require('express');
var router  = express.Router();

/* MySQL connection */
var pool  = require("../config/database.conf.js").database_conf;

function handle_database(req,res) {

     pool.getConnection(function(err,connection){
         if (err) {
           connection.release();
           res.json({"code" : 100, "status" : "Error in connection database"});
           return;
         }

         console.log('connected as id ' + connection.threadId);

         connection.query("select * from customers",function(err,rows){
             connection.release();
             if(!err) {
                 res.json(rows);
             }
         });

         connection.on('error', function(err) {
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;
         });
   });
 }

/* GET users listing. */
router.get('/', function(req, res) {
  pool.getConnection(function(err, connection){
		connection.query('select * from customers', function(err, rows){
			if(err)
				console.log('Error Selecting : %s', err);

      res.json(rows);
			//res.render('customers', {page_title:'Customers - Node.js', data:rows});
		});
	});
  //handle_database(req, res);
  //res.send('respond with a resource');
});

module.exports = router;
