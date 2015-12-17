
/**
 * Module dependencies.
 */
 
var express = require('express');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');

/**
 * load customers route
 */
var customers = require('./routes/customers');

var app = express();

var myConnection = require('express-myconnection'), // express-myconnection module
    dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'root',
      port: 3306,
      database: 'nodejs'
    };


var mysql = require('mysql');

// Configuration

app.configure(function(){
  app.set('port', process.env.PORT || 4300);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

/**
 * connection
 */ 
app.use(myConnection(mysql, dbOptions, 'request'));

// Routes

app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id', customers.save_edit);

app.use(app.router);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
