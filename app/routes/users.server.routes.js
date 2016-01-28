var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app){
	app.route('/register')
	.post(users.register)
	.get(users.renderRegister);

	app.route('/login')
	.post(passport.authenticate('local',
	{
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : true
	}))
	.get(users.renderLogin);

	app.get('/logout', users.logout);
};