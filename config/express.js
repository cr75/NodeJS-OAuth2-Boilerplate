var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    oauthserver = require('oauth2-server');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(methodOverride());

    // OAuth2 middleware
    app.oauth = oauthserver({
        model: require('../app/models/oauth2.server.model'),
        grants: ['password'],
        debug: true,
        accessTokenLifetime: null,
        continueAfterResponse: false
    });

    app.all('/api/oauth2/token', app.oauth.grant());

    app.use(app.oauth.errorHandler());

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    return app;
};
