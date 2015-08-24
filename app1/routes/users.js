var express = require('express');
var router  = express.Router();

/* MySQL connection */
var mysql   = require('mysql');
var pool    = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'nodejs'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err, conn){
    conn.query('select * from customer', function(err, rows){
      if(err)
        console.log('Error Selecting : %s', err);

      res.render('customers', {page_title: 'Customers - Node.js', data:rows});
    });
  });
  //res.send('respond with a resource');
});

module.exports = router;
