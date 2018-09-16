'use strict';

var joi = require('joi');

module.exports = {
  options: { allowUnknownBody: false },
  body: {
    password: joi.string().required(),
    confirm_password: joi.string().required()
  },
  params: {
    id: joi.string().required(),
    token: joi.string().required()
  }
};