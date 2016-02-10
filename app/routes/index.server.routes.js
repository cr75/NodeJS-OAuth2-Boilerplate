module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('Welcome to Node.js OAuth2 Boilerplate');
    });
};
