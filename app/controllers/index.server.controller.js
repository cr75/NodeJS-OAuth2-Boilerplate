exports.render = function(req, res){
	res.render('index', {
		title : 'Node.js OAuth2 Boilerplate',
		user : req.user
	});
};