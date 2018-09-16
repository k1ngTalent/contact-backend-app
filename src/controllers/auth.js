import User from '../entities/user';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken';
import Jwt from 'jwt-simple';
const TOKEN_SECRET = 'myContactApp';


/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = (req, res) => {
	User.findOne({
		username: req.body.username
	}, (err, user) => {
		if (err || !user) {
			return res.status(401).json({
				status: "error",
				messgae: "User_doesn't_exist"
			})
		}
		user.verifyPassword(req.body.password).then(isValid => {
			if (isValid) {
				let payload = {
					_id: user._id,
					email: user.email,
					username: user.username,
					name: user.name
				}
				var token = jwt.sign(payload, TOKEN_SECRET, {
					expiresIn: '1h'
				});
				console.log(token);
				return res.status(200).json({
					status: "success",
					message: "login_successfully",
					token: token
				})
			} else {
				return res.status(201).json({
					status: "success",
					message: "invalid_credentials",
				})

			}
		})
	}).catch(err => {
		return res.status(401).json({
			status: "error",
			messgae: "login failed"
		})
	})
};
/**
 * Given a json request 
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token 
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = (req, res) => {
	var _User = new User(req.body);
	_User.save((err, user) => {
		if (err) {
			return res.status(201).json({
				status: "error",
				message: "user_exists_error"
			})
		}
		let payload = {
			_id: user._id,
			email: user.email,
			username: user.username,
			name: user.name
		}
		var token = jwt.sign(payload, TOKEN_SECRET, {
			expiresIn: '1h'
		});
		return res.status(200).json({
			status: "success",
			message: "Signup successfully",
			token: token
		})
	})
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = (req, res) => {
	/**
	 * 
	 * Send them a new generated password to their email/send a link of recovering password
	 * Using the second method though
	 */
	let _email = req.body.email;
	var payload = {
		email: _email
	}
	User.findOne({
			email: req.body.email
		}, (err, user) => {
			if (err || !user) {
				return res.status(401).json({
					status: "error",
					message: "invalid_email"
				});
			}
			var secret = user.password + ' ' + user.createdAt.getTime();
			var token = jwt.sign(payload, secret,{
				expiresIn: '1h'});
			return res.status(200).json({
				status:"success",
				data:'http://' + req.headers.host + '/auth/resetPassword/'+user._id+'/' + token
			});
			/*
                Email  should be sent to user to contain the link 
			*/
			


	})
};
export const resetPassword = (req, res) => {
	if(req.body.password != req.body.confirm_password){
		return res.status(201).json({
			status: "success",
			message: "password_dont__match"
		});
	}
	User.findOne({
		_id: req.params.id
	}, (err, user) => {
		if (err || !user) {
			return res.status(401).json({
				status: "error",
				message: "invalid_user"
			});
		}
		
		var secret = user.password + ' ' + user.createdAt.getTime();
		
		 jwt.verify(req.params.token,secret,(err,data)=>{
			if(err){
				return res.status(401).json({
					status:"error",
					message:err
				  });
				}
				 let  _data=data;
				  if(_data.email != user.email){
					return res.status(401).json({
						status: "error",
						message: "invalid_token"
					});
				}else{
					User.findByIdAndUpdate(req.params.id, {
						password: req.body.password
					}, (err, user) => {
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
			
					})
				}
			
		 
			
		});
	
		
		

})
		
	}

		export default {
			login,
			signup,
			forgotPassword,
			resetPassword
		}