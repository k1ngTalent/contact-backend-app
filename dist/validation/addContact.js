'use strict';

var joi = require('joi');
var myCustomJoi = joi.extend(require('joi-phone-number'));
module.exports = {
  options: { allowUnknownBody: false },
  body: {
    firstname: joi.string().required(),
    lastname: joi.string(),
    email: joi.string().email().required(),
    phonenumber: myCustomJoi.string().phoneNumber()
  }
};