/* MySQL */
var connection   = require("../config/database.conf.js").database_conf;

/* create connection pooling */
handleConnection();

/* create class user model */
var Chat = module.exports = function(config) {

};

Chat.prototype.save = function(data, callback) {
    var query = connection.query("insert into chat set ? ",[data], function(err, rows, next){
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