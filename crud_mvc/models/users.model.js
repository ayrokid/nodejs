/* MySQL */
var connection   = require("../config/database.conf.js").database_conf;

/* create connection pooling */
handleConnection();

/* create class user model */
var User = module.exports = function(config) {

};

User.prototype.getAll = function(callback){
    var query = connection.query("select * from users ", function(err, rows, next){
      var response;
      if(err){
          response = {
              message: err,
              statusCode: err.code
          };
          callback(response);
      };
      callback({ statusCode : 200, result : rows });
  });
};

User.prototype.getData = function(user_id, callback) {
    var query = connection.query("select * from users where user_id = ? limit 1 ",[user_id], function(err, rows, next){
      var res;
      if(err){
        res = {
          message: err,
          statusCode: err.code
        };
        callback(res);
      }
      callback({ statusCode : 200, result : rows });
    });
};

User.prototype.update = function(data, user_id, callback) {
    var query = connection.query("update users set ? where user_id = ? ",[data, user_id], function(err, rows, next){
      var res;
      if(err){
        res = {
          message: err,
          statusCode: err.code
        };
        callback(res);
      }
      callback({ statusCode : 200, result : 'true' });
    });
};

User.prototype.save = function(data, callback) {
    var query = connection.query("insert into users set ? ",[data], function(err, rows, next){
      var res;
      if(err){
        res = {
          message: err,
          statusCode: err.code
        };
        callback(res);
      }
      callback({ statusCode : 200, result : 'true' });
    });
};

User.prototype.delete = function(user_id, callback) {
    var query = connection.query("delete from users where user_id = ? ",[user_id], function(err, rows, next){
      var res;
      if(err){
        res = {
          message: err,
          statusCode: err.code
        };
        callback(res);
      }
      callback({ statusCode : 200, result : 'true' });
    });
};

function handleConnection() {
    console.log("connected db..");

    connection.getConnection(function(err) {
        if(err){
            console.log('[DATABASE] error when connecting to db: ', err);
            setTimeout(handleConnection, 2000);
        }
    });
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('[DATABASE] connection lost, retry connect', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST')
            handleConnection();
        else
            throw err;
    });
}
