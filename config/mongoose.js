var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    require('../app/models/user.server.model');
    require('../app/models/oauth2.server.model');
    return db;
};
