
/**
 * Module dependencies.
 */

var express = require('express')
  , path    = require('path')
  , bodyParser = require('body-parse')
  , expressValidator = require('express-validator')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/**
 * Mysql Connection
 */
var connection  = require('express-myconnection'),
    mysql       = require('mysql');
app.use(
  connection(mysql,{
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'nodejs' 
  }, 'request');
);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

/**
 * RESTfull route
 */
var router = express.Router();

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
