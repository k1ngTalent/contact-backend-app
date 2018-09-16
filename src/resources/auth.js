import Auth from '../controllers/auth';
import  validate from 'express-validation';
import  validation from '../validation';
module.exports = app => {
	app.route('/auth/login').post(validate(validation.login),Auth.login);
	app.route('/auth/signup').post(validate(validation.addUser),Auth.signup);

	/*** BONUS POINTS ***/
	app.route('/auth/forgotPassword').post(validate(validation.forgotPass),Auth.forgotPassword);
	/*
	In the front-end there should be a get route where user supplies new password
	Then from there the user request is handled by th  below api
	*/
	app.route('/auth/resetPassword/:id/:token').post(validate(validation.resetPass),Auth.resetPassword);

	app.use(function(err, req, res, next){
		res.status(400).json(err);
	  });
};
