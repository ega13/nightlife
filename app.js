var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var merge = require('merge');
var yelp = require('node-yelp-api');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var path = require('path');
var flash = require("connect-flash");
var rindex = require('./routes/index.js');
var ryelp = require('./routes/yelp.js');
var rlogin = require('./routes/login.js');
var app = express();
var User = require('./models/user.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(expressSession({secret: 'simple', resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname + '/public')));
app.set('views', path.join(__dirname + '/views'));

app.set('view engine', 'ejs');
app.use('ejs', require('ejs').__express);

mongoose.connect('mongodb://ega13:tsarly2051987@ds115799.mlab.com:15799/data', function(err){
	if(err)
	{
		console.log('Failed connect to mongoose');
	}else{
		console.log('Successfully connect to mongoose');
	}
});
var db = mongoose.connection;

passport.serializeUser(function(user, done){

	done(null, user.id);
});
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

rindex(app, db);
ryelp(app, db);
rlogin(app, db);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server is running on port " + port);
});
