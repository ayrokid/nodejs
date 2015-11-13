/* MySQL connection */
var mysql   = require('mysql');

var database_conf   = mysql.createPool({
  connectionLimit : 100, //important
  host : 'localhost',
  user : 'root',
  password : 'root',
  database : 'nodejs',
  debug    :  false
});

exports.database_conf = database_conf;