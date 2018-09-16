'use strict';

var joi = require('joi');

module.exports = {
  options: { allowUnknownBody: false },
  body: {
    username: joi.string().required(),
    password: joi.string().required()
  }
};