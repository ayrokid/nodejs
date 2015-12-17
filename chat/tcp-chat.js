var net = require('net');

var sockets = []

var server = net.createServer(function(socket){
	//setiap socket yang masuk di push ke array
	socket.push(socket);

	socket.on('data', function(data){
		for(var i=0; i < sockets.length; i++){
			sockets[i].write(data);
		}
	});

});

server.listen(1234);
console.log("server berjalan pada port 2345");
