var redis  = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('connect', function(){
	console.log('connected');
});

client.set('framework', 'AngularJS', function(err, res){
	console.log(res);
});

client.get('framework', function(err,res){
	console.log(res);
});

client.exists('framework', function(err, replay) {
		if(replay === 1){
				console.log('exists');
		}else {
				console.log('doesn\'t exist');
		}
});

client.set('hit:', 10, function(){
		client.incr('hit:', function(err, res){
				console.log('Counter Increment : ' + res);
		});

		client.decr('hit:', function(err, res){
				console.log('Counter Decrement : ' + res);
		});
});
