var mongoose = require('mongoose'),
    UserModel = mongoose.model('User'),
    OAuthAccessTokensModel = mongoose.model('OAuthAccessTokens'),
    OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens'),
    OAuthClientsModel = mongoose.model('OAuthClients');

exports.getAccessToken = function(bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    OAuthAccessTokensModel.findOne({
        accessToken: bearerToken
    }, callback);
};

exports.getClient = function(clientId, clientSecret, callback) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');
    if (clientSecret === null) {
        return OAuthClientsModel.findOne({
            clientId: clientId
        }, callback);
    }
    OAuthClientsModel.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    }, callback);
};

// Here I am hard coding the apps. it can be dynamic too
var authorizedClientIds = ['webapp', 'iosapp', 'androidapp'];
exports.grantTypeAllowed = function(clientId, grantType, callback) {
    console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

    if (grantType === 'password') {
        return callback(false, authorizedClientIds.indexOf(clientId) >= 0);
    }

    callback(false, true);
};

exports.saveAccessToken = function(token, clientId, expires, userId, callback) {
    console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

    var accessToken = new OAuthAccessTokensModel({
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    accessToken.save(callback);
};

/*
 * Required to support password grant type
 */
exports.getUser = function(username, password, callback) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');

    OAuthUsersModel.findOne({
        username: username,
        password: password
    }, function(err, user) {
        if (err) return callback(err);
        callback(null, user._id);
    });
};

/*
 * Required to support refreshToken grant type
 */
exports.saveRefreshToken = function(token, clientId, expires, userId, callback) {
    console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

    var refreshToken = new OAuthRefreshTokensModel({
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    refreshToken.save(callback);
};

exports.getRefreshToken = function(refreshToken, callback) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    OAuthRefreshTokensModel.findOne({
        refreshToken: refreshToken
    }, callback);
};
