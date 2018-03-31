module.exports = function(app, db){

	app.get('/auth/logout', function(req, res){
		req.session.destroy();
		console.log('logout');
		req.logout();
		res.redirect('/');
	});
}