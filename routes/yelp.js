var merge = require('merge');
var yelp = require("node-yelp");
var Go = require('../models/yelp.js');

module.exports = function(app, db){
	var bus = new Array();
	var loc = new Array();
	var rating = new Array();
	var image = new Array();
	var phone = new Array();
	var url = new Array();
	var review = new Array();
	var client = yelp.createClient({

		  oauth: {
		     'consumer_key': 'm3W5XQnBbqnbrK0Zztu7kQ',
			 'consumer_secret': 'AvVRQoYVlAXF1wzxlCIPxX4M7b0',
			 'token': 'u8k9p8unAR4LxOvVY4casWKR0T_GIKJ1',
			 'token_secret': 'scy9hvad3BwIOhOtG2ZFKBsQvVg'
		  },
	  
		  
		  httpClient: {
		    maxSockets: 25  
		  }
	}); 
	 
	app.get('/', function(req, res){

		client.search({
			  terms: "Café de la presse",
			  location: "BELGIUM"
		}).then(function (data) {
			  var businesses = data.businesses;
			  var location = data.region;
			  
			  for(var i = 0; i < businesses.length; i++){

			  	bus.push(businesses[i].name);
			  	address = businesses[i].location.display_address[0] + ", " + businesses[i].location.display_address[1] + ", " + businesses[i].location.display_address[2];
			  	loc.push(address);
			  	rating.push(businesses[i].rating_img_url);
			  	image.push(businesses[i].image_url);
			  	phone.push(businesses[i].phone);
			  	url.push(businesses[i].url);
			  	review.push(businesses[i].review_count);
			  }

			  res.render('index', {bus: bus, locs: loc, ratings: rating, images: image, phones: phone, urls: url, reviews: review, title: "Nightlife", userid: req.session.userid, username: req.session.username});

		});

	});

	app.post('/', function(req, res){
				 		
		bus = [];
		loc = [];
		rating = [];
		image = [];
		phone = [];
		url = [];
		review = [];
		var locationx = req.body.location;
		console.log('locationx = ' + locationx);
		client.search({
			  terms: "Food and Drink",
			  location: locationx
		}).then(function (data) {
			  var businesses = data.businesses;
			  var location = data.region;
			  
			  for(var i = 0; i < businesses.length; i++){

			  	bus.push(businesses[i].name);
			  	address = businesses[i].location.display_address[0] + ", " + businesses[i].location.display_address[1] + ", " + businesses[i].location.display_address[2];
			  	loc.push(address);
			  	rating.push(businesses[i].rating_img_url);
			  	image.push(businesses[i].image_url);
			  	phone.push(businesses[i].phone);
			  	url.push(businesses[i].url);
			  	review.push(businesses[i].review_count);
			  }

			 res.render('index', {bus: bus, locs: loc, ratings: rating, images: image, phones: phone, urls: url, reviews: review, title: locationx, userid: req.session.userid, username: req.session.username});

		});

		


	})
}
