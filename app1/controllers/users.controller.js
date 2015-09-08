/* Load Model */
var Users = require('../models/users.model.js');
var UsersModel = new Users();

/* Create Controller Class User */
var UsersController = module.exports = function(config) {

}

UsersController.prototype.all = function (callback) {
    UsersModel.getAll(function(rows) {
        //res.render('pages/users', {title:'Users - Node.js', data:rows.result});
        callback(rows);
    });
};
