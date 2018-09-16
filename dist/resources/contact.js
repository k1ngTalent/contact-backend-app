'use strict';

var _contact = require('../controllers/contact');

var _contact2 = _interopRequireDefault(_contact);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _validation = require('../validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/all', _passport2.default.authenticate('jwt', { session: false }), _contact2.default.all);
router.get('/:contactId', _passport2.default.authenticate('jwt', { session: false }), _contact2.default.get);
router.post('/create', _passport2.default.authenticate('jwt', { session: false }), (0, _expressValidation2.default)(_validation2.default.addContact), _contact2.default.create);
router.put('/update/:contactId', _passport2.default.authenticate('jwt', { session: false }), (0, _expressValidation2.default)(_validation2.default.editContact), _contact2.default.update);
router.delete('/:contactId', _passport2.default.authenticate('jwt', { session: false }), (0, _expressValidation2.default)(_validation2.default.delContact), _contact2.default.remove);
/**
 * 
 * 
 */
module.exports = function (app) {
  app.use('/contact', router);
  app.use(function (err, req, res, next) {
    res.status(400).json(err);
  });
  /**
   * Create the remaining routes
   * get,
   * create,
   * delete,
   * update,
   * remove
   */
};