/* Load Model */
var Chat = require('../models/chat.model.js');
var ChatModel = new Chat();

/* Create Controller Class User */
var ChatController = module.exports = function(config) {

}

ChatController.prototype.save = function(input, callback) {
	var data = {
		message		: input.msg,
		user 		: input.user,
		created_at 	: new Date()
	};

	ChatModel.save(data, function(result) {
		callback(result);
	});

};