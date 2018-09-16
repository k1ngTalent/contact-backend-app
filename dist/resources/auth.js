'use strict';

var _auth = require('../controllers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _validation = require('../validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
	app.route('/auth/login').post((0, _expressValidation2.default)(_validation2.default.login), _auth2.default.login);
	app.route('/auth/signup').post((0, _expressValidation2.default)(_validation2.default.addUser), _auth2.default.signup);

	/*** BONUS POINTS ***/
	app.route('/auth/forgotPassword').post((0, _expressValidation2.default)(_validation2.default.forgotPass), _auth2.default.forgotPassword);
	/*
 In the front-end there should be a get route where user supplies new password
 Then from there the user request is handled by th  below api
 */
	app.route('/auth/resetPassword/:id/:token').post((0, _expressValidation2.default)(_validation2.default.resetPass), _auth2.default.resetPassword);

	app.use(function (err, req, res, next) {
		res.status(400).json(err);
	});
};