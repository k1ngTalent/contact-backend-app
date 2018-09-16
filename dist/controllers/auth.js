'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.resetPassword = exports.forgotPassword = exports.signup = exports.login = undefined;

var _user = require('../entities/user');

var _user2 = _interopRequireDefault(_user);

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN_SECRET = 'myContactApp';

/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
var login = exports.login = function login(req, res) {
	_user2.default.findOne({
		username: req.body.username
	}, function (err, user) {
		if (err || !user) {
			return res.status(401).json({
				status: "error",
				messgae: "User_doesn't_exist"
			});
		}
		user.verifyPassword(req.body.password).then(function (isValid) {
			if (isValid) {
				var payload = {
					_id: user._id,
					email: user.email,
					username: user.username,
					name: user.name
				};
				var token = _jsonwebtoken2.default.sign(payload, TOKEN_SECRET, {
					expiresIn: '1h'
				});
				console.log(token);
				return res.status(200).json({
					status: "success",
					message: "login_successfully",
					token: token
				});
			} else {
				return res.status(201).json({
					status: "success",
					message: "invalid_credentials"
				});
			}
		});
	}).catch(function (err) {
		return res.status(401).json({
			status: "error",
			messgae: "login failed"
		});
	});
};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
var signup = exports.signup = function signup(req, res) {
	var _User = new _user2.default(req.body);
	_User.save(function (err, user) {
		if (err) {
			return res.status(201).json({
				status: "error",
				message: "user_exists_error"
			});
		}
		var payload = {
			_id: user._id,
			email: user.email,
			username: user.username,
			name: user.name
		};
		var token = _jsonwebtoken2.default.sign(payload, TOKEN_SECRET, {
			expiresIn: '1h'
		});
		return res.status(200).json({
			status: "success",
			message: "Signup successfully",
			token: token
		});
	});
};
/**
 * Implement a way to recover user accounts
 */
var forgotPassword = exports.forgotPassword = function forgotPassword(req, res) {
	/**
  * 
  * Send them a new generated password to their email/send a link of recovering password
  * Using the second method though
  */
	var _email = req.body.email;
	var payload = {
		email: _email
	};
	_user2.default.findOne({
		email: req.body.email
	}, function (err, user) {
		if (err || !user) {
			return res.status(401).json({
				status: "error",
				message: "invalid_email"
			});
		}
		var secret = user.password + ' ' + user.createdAt.getTime();
		var token = _jsonwebtoken2.default.sign(payload, secret, {
			expiresIn: '1h' });
		return res.status(200).json({
			status: "success",
			data: 'http://' + req.headers.host + '/auth/resetPassword/' + user._id + '/' + token
		});
		/*
               Email  should be sent to user to contain the link 
  */
	});
};
var resetPassword = exports.resetPassword = function resetPassword(req, res) {
	if (req.body.password != req.body.confirm_password) {
		return res.status(201).json({
			status: "success",
			message: "password_dont__match"
		});
	}
	_user2.default.findOne({
		_id: req.params.id
	}, function (err, user) {
		if (err || !user) {
			return res.status(401).json({
				status: "error",
				message: "invalid_user"
			});
		}

		var secret = user.password + ' ' + user.createdAt.getTime();

		_jsonwebtoken2.default.verify(req.params.token, secret, function (err, data) {
			if (err) {
				return res.status(401).json({
					status: "error",
					message: err
				});
			}
			var _data = data;
			if (_data.email != user.email) {
				return res.status(401).json({
					status: "error",
					message: "invalid_token"
				});
			} else {
				_user2.default.findByIdAndUpdate(req.params.id, {
					password: req.body.password
				}, function (err, user) {
					if (err || !user) {
						return res.status(401).json({
							status: "error",
							message: "password_reset__failed"
						});
					}
					return res.status(200).json({
						status: "success",
						message: "password_reset__successful"
					});
					/*
     Email notification should be sent to user on success
     */
				});
			}
		});
	});
};

exports.default = {
	login: login,
	signup: signup,
	forgotPassword: forgotPassword,
	resetPassword: resetPassword
};