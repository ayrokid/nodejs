var redis  = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('connect', function(){
	console.log('connected');
});

client.set('framework', 'AngularJS', function(err, res){
	if(err)
		console.error('error');

	console.log(res);
});

client.get('framework', function(err,res){
	if(err)
		console.error(err);

	console.log(res);
});
/*
client.exists('framework', function(err, replay) {
	if(err)
		console.error('not found');

	if(replay === 1){
			console.log('exists');
	}else {
			console.log('doesn\'t exist');
	}
});
*/
client.set('hit:', 10, function(err, res){
	if(err)
		console.error('error set Hit');

	client.incr('hit:', function(err, res){
			console.log('Counter Increment : ' + res);
	});

	client.decr('hit:', function(err, res){
			console.log('Counter Decrement : ' + res);
	});
});
