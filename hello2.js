var http = require('http');

var s = http.createServer(function(req, res){
	res.writeHead(200,{'content-type':'text/plain'});
	res.end('Hello World');
	});

	s.listen(1234);
	console.log('server running on port 1234');

