/* MySQL */
var connection   = require("../config/database.conf.js").database_conf;

/* create connection pooling */
handleConnection();

/* create class customer model */
var Customer = module.exports = function(config) {

};

Customer.prototype.getAll = function(callback){
    var query = connection.query("select * from customers ", function(err, rows, next){
      var response;
      if(err){
          response = {
              message: err,
              statusCode: err.code
          };
          callback(response);
      };
      callback({ statusCode : 200, content_list : rows });
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
