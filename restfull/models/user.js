var mysql = require('mysql');
var db_config = require('../config/mysql.js').database_conf;

/* create connection pooling */
handleDisconnect();

var UsersModel = module.exports = function(config){

};

UsersModel.prototype.insertUser = function(data, next){
    var query = connection.query("insert into user set ? ",data, function(err, rows){
      var response;
      if(err){
        response = {
          message : err,
          statusCode : err.code
        };
        next(response);
      };
      next({ statusCode : 200, result : rows });
    });
};

UsersModel.prototype.getUser = function(user_id, callback){
  var query = connection.query("select * from user where user_id = ? ", [user_id], function(err, rows, field){
    var response;
    if(err){
      response = {
        message : err,
        statusCode : err.code
      };
      callback(response);
    };
    callback({ statusCode : 200, result : rows });
  });
};

UsersModel.prototype.getAllUser = function(callback){
  var query = connection.query("select * from user", function(err, rows, field){
    var response;
    if(err){
      response = {
        message : err,
        statusCode : err.code
      };
      callback(response);
    };
    callback({ statusCode : 200, result : rows });
  });
};

function handleDisconnect() {
    console.log("database connected");
    connection = mysql.createPool(db_config);

    connection.getConnection(function(err) {
        if(err){
            console.log('[DATABASE] error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err) {
        console.log('[DATABASE] CONNECTION LOST, RETRY CONNECT', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
          handleDisconnect();
        } else {
          throw err;
        }
    });
}
