var net = require('net');

var server = net.createServer(function(socket){
		socket.write("hello world");
		socket.end("the end \n");
	});

	server.listen(2345);
	console.log("server berjalan ");
