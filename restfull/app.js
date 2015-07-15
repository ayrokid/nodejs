
/**
 * Module dependencies.
 */

var express     = require('express')
  , bodyParser  = require('body-parser');
var expressValidator = require('express-validator');
var app         = express();

var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/beardb'); 

var Bear        = require('./models/bear');

// Configuration
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
var port = process.env.PORT || 8080

// ROUTES FOR OUR API
// ===========================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
  console.log('Something is happening..');
  next(); //make sure we go to the next routes
})

// test route to make sure everything is working
router.get('/', function(req, res){
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for out API will happen here
router.route('/bears')
  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
      var bear  = new Bear();// create a new instance of the Bear model
      bear.nama = req.body.nama; 
      bear.phone = req.body.phone;

      // save the bear and check for errors
      bear.save(function(err) {
          if(err)
            res.send(err);
 
          res.json({ message: 'Successed' });
      });

  })
  //get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
     Bear.find(function(err, bears) {
        if(err)
          res.send(err);

        res.json(bears);
     })
  })

// on routes that end in /bears/:bear_id
router.route('/bears/:bear_id')

  // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
          if(err)
            res.send(err);

          res.json(bear);
      });
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
          if(err)
            res.send(err);

          bear.nama  = req.body.nama;
          bear.phone = req.body.phone;

          //save the bear
          bear.save(function(err) {
              if(err)
                res.send(err);

              res.json( { message: 'Bear updated!' });
          });
      });
  })

  //delete the bear with this id
  .delete(function(req, res) {
      Bear.remove({
          _id : req.params.bear_id
      }, function(err, bear) {
          if(err)
            res.send(err);

          res.json({ message: 'Successfully deleted' });
      });
  });

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// ==============================
app.listen(port);
console.log('Magic happens on port ' + port);
