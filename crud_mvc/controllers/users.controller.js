/* Load Model */
var Users = require('../models/users.model.js');
var UsersModel = new Users();

/* Create Controller Class User */
var UsersController = module.exports = function(config) {

}

UsersController.prototype.all = function (callback) {
    UsersModel.getAll(function(rows) {
        callback(rows);
    });
};

UsersController.prototype.getUser = function(user_id, callback) {
	if(parseInt(user_id) > 0) {
		UsersModel.getData(user_id, function(result) {
			callback(result);
		});
	}else{
		callback({ statusCode : 404, data : 0 });
	}
};

UsersController.prototype.save_edit = function(input, user_id, callback) {
	var data = {
		name	: input.name,
		email	: input.email
	};

	UsersModel.update(data, user_id, function(result) {
		callback(result);
	});

};

UsersController.prototype.save = function(input, callback) {
	var data = {
		name	: input.name,
		email	: input.email
	};

	UsersModel.save(data, function(result) {
		callback(result);
	});

};

UsersController.prototype.delete = function(user_id, callback) {

	UsersModel.delete(user_id, function(result) {
		callback(result);
	});

};
