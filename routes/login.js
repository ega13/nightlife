var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user.js');

module.exports = function(app, data){

	var userid, username;
	passport.use(new FacebookStrategy({
			clientID: '362427770926470',
			clientSecret: 'e69f376371902c6298ba35606bdca49b',
			callbackURL: 'https://nightlife1.herokuapp.com//login/facebook/return',
			profileFields: ['id', 'emails', 'photos']
		},

		function(accessToken, refreshToken, profile,  done){
			User.findOne({email: profile.emails[0].value}, function(err, uer){
				console.log('Profile Facebook = ' + profile);
				if(err) {return done(err);}

				if(user)
				{
					userid = user._id;
					username = user.username;
					return done(null, user);
				}else{

					var user = new User();
					user.username = profile.emails[0].value;
					user.password = profile.password;
					user.email = profile.emails[0].value;
					user.facebook.token = accessToken;
					user.facebook.fbid = profile.id;
					user.facebook.email = profile.emails[0].value;
					user.facebook.displayName = profile.displayName;
					user.facebook.avatar = profile.photos[0].value;
					user.facebook.profileUrl = profile.profileUrl;

					user.save(function(err, obj){
						userid = obj._id;
						username = obj.username;
						if(err) {return done(err);}
						return done(null, user);
					});
				}
			});
		}
	));

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', {failureRedirect: '/login'}), function(req, res){
			req.session.userid = userid;
			req.session.username = username;
			res.redirect('/');
		});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
}
