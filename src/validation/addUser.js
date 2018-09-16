const joi = require('joi');

module.exports={
options:{allowUnknownBody:false},
body:{
email:joi.string().email().required(),
username:joi.string().required(),
password:joi.string().required(),
name:joi.string().required(),
}
};