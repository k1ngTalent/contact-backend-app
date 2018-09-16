'use strict';

var joi = require('joi');

module.exports = {
  options: { allowUnknownBody: false },
  body: {
    email: joi.string().required()
  }
};