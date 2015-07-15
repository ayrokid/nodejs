// server.js

// BASE SETUP
// ===============================

var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');
var path             = require('path');
var expressValidator = require('express-validator');

// configure app to use bodyParser();
// this will let us get the data from a POST
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

/**
 * MySQl Connection
 */
var connection = require('express-myconnection');
var mysql      = require('mysql');
app.use(
    connection(mysql,{
	host	: 'localhost',
	user	: 'root',
	password: 'root',
	database: 'nodejs',
	debug	: false //set true if you wanna see debug logger
    }, 'request')
);

// ROUTES FOR OUR API
// ===============================
var router = express.Router();

// test route to make sure everything is working
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to out api!' });
});

/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

var curut = router.route('/user');

curut.get(function(req, res, next){
      req.getConnection(function(err, conn){
          if(err) return next("Can't Connect");

          var query = conn.query('select * from user', function(err, rows){
            if(err){
              console.log(err);
              return next("MySQL error, check your query");
            }

            res.render('user', {title: "RESTfull crud example", data:rows});
          });
      });
});
/**
 * psot data to DB | POST
 */
curut.post(function(req, res, next){
  //validation
  req.assert('name', 'Name is Required').notEmpty();
  req.assert('email', 'A Valid email is rquired').isEmail();
  req.assert('password', 'Enter a password 6 - 20').len(6,20);

  var errors = req.validationErrors();
  if(errors){
    res.status(422).json(errors);
    return;
  }

  //get data
  var data = {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
  };

  //inserting into mysql
  req.getConnection(function (err, conn) {
    if (err) return next("Can't Connect");

    var query = conn.query("insert into user set ? ", data, function(err, rows){
      if(err){
        console.log(err);
        return next("Mysql error, check your query");
      }

      res.sendStatus(200);
    });

  });

});

/**
 * now for single route (GET, DELETE, PUT)
 */
var curut2 = router.route('/user/:user_id');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.
remove curut2.all() if you dont want it
------------------------------------------------------*/
/*
curut2.all(function(req, res, next) {
  console.log("You need to smth about curut2 route ? do it here");
  console.log(req.params);
});
*/
//get data to update
curut2.get(function(req, res, next) {
  var user_id = req.params.user_id;
  //return res.send("user not found");

  req.getConnection(function(err, conn) {
    if(err) return next("Can't Connect");

    var query = conn.query("select * from user where user_id = ? ", [user_id], function(err,rows){
      if(err){
        console.log(err);
        return next("MySQL error, check your query");
      }

      //if uer not found
      if(rows.length < 1)
        return res.send("user not found");

      res.render('edit', { title: 'Edit User', data:rows });

    });

  });
  
});

//update data
curut2.put(function(req,res,next){
  var user_id = req.params.user_id;

  req.assert('name', 'Name is required').notEmpty();
  req.assert('email', 'A Valid email is required').isEmail();
  req.assert('password', 'Enter a password a 6 - 20 ').len(6,20);

  var errors = req.validationErrors();
  if(errors){
    res.status(422).json(errors);
    return;
  }

  //get data
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  //inserting into database
  req.getConnection(function(err, conn){
    if(err) return next("Can't Connect");

    var query = conn.query("update user set ? where user_id = ? ", [data, user_id], function(err, rows){
      if(err){
        console.log(err);
        return next("Mysql error, check your query");
      }

      res.sendStatus(200);

    });

  });

});

//delete data
curut2.delete(function(req,res,next){
  var user_id = req.params.user_id;

  req.getConnection(function(err, conn){
    if(err) return next("Cannot Connect");

    var query = conn.query('delete from user where user_id = ? ', [user_id], function(err, rows){

      if(err){
        console.log(err);
        return next("mysql error, check your query");
      }

      res.sendStatus(200);
    });

  });

});



// REGISTER OUT FOUTER
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
//================================
var server = app.listen(3000, function(){
  console.log("Listening to port %s ", server.address().port);
});
