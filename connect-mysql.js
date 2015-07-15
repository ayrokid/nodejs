var mysql = require('mysql');
var connection	= mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: 'root',
	database: 'retaildb'
});

connection.connect();

connection.query("select * from barang", function(err, rows, fields) {
	if(! err)
		console.log('The solution is: ', rows);
	else
		console.log('Error while performing Query');
});

connection.end();
