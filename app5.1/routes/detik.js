var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router 	= express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('berita detik');
});

router.get('/bola', function(req, res, next) {
  url = 'http://detik.feedsportal.com/c/33613/f/656101/index.rss';

  request(url, function(error, response, html) {

  	if(!error){
  		var $ = cheerio.load(html);

  		var title, release, rating, description;

  		var json = {title : "", release : "", rating : "", description : ""};

  		$('.header').filter(function(){
  			var data = $(this);

  			title = data.children().first().text();

  			release = data.children().last().children().text();

  			json.title = title;

  			json.release= release;
  		});

  		$('.star-box-giga-star').filter(function(){
            var data = $(this);

            // The .star-box-giga-star class was exactly where we wanted it to be.
            // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

            rating = data.text();

            json.rating = rating;
        });

      $('p[itemprop="description"]').filter(function() {
            var data = $(this);

            description = data.text();

            json.description = description;
      });

  	}

  	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

	    console.log('File successfully written! - Check your project directory for the output.json file');

	})

	// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
	res.send('Check your console!')

  });

});

module.exports = router;
