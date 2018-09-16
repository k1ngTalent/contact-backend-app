'use strict';

var _user = require('../entities/user');

var _user2 = _interopRequireDefault(_user);

var _passportJwt = require('passport-jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN_SECRET = 'myContactApp';


module.exports = function (passport) {
    var jwtOptions = {};
    jwtOptions.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = TOKEN_SECRET;

    var strategy = new _passportJwt.Strategy(jwtOptions, function (payload, next) {
        _user2.default.findOne({ username: payload.username }, function (err, user) {
            if (err) {
                return next(err, false);
            }
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        });
    });

    passport.use(strategy);
};