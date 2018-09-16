const joi = require('joi');

module.exports={
options:{allowUnknownBody:false},
params:{
contactId:joi.string().required()
}
};