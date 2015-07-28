//service.js

/**
 * BASE SETUP
 * --------------------------------
 */
 var express      = require('express');
 var app          = express();
 var bodyParser   = require('body-parser');
 var path         = require('path');
 var expressValidator = require('express-validator');

 /**
  * -------------------------------
  * Model
  */
var Users = require('./models/user.js');
var userModel = new Users();

 // configure apps
 app.set('views', './views');
 app.set('views engine', 'ejs');

 app.use(express.static(path.join(__dirname, 'public')));
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());
 app.use(expressValidator());

// ROUTER FOR OUR API
// -------------------
var router = express.Router();

// root router
router.get('/', function(req, res) {
    res.json({ message: 'Root Router!'});
});

// our router here
var routerPut = router.route('/user/:user_id');

routerPut.get(function(req, res, next) {
    var user_id = req.params.user_id;

    userModel.getUser(user_id, function(rows) {
      /*
        res.status(rows.statusCode);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("X-Powered-By", "Okezone.com v1.0" );
        res.write(JSON.stringify(rows), null);
        res.end();
        */
        res.json(rows);
    });
});

var routerAllUser = router.route('/user');
routerAllUser.get(function(req, res, next) {
    userModel.getAllUser(function(rows) {
        res.json(rows);
    });
});

/**
 * post data to DB | POST
 */
routerAllUser.post(function(req, res, next){
  //validation
  req.assert('name', 'Name is Required').notEmpty();
  req.assert('email', 'A Valid email is required').isEmail();
  req.assert('password', 'Enter a password 6 - 20').len(6,20);

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

  //inserting into mysql
  userModel.insertUser(data, function(rows){
    res.json(rows);
  })

})

/**
 * REGISTER OUR ROUTER
 * --------------------
 */
 app.use('/api', router);

 /**
  * START THE SERVER
  * -----------------
  */
  var server = app.listen(3000, function() {
      console.log("Listening to port %s ", server.address().port);
  });
