'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.ContactSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _mongooseStringQuery = require('mongoose-string-query');

var _mongooseStringQuery2 = _interopRequireDefault(_mongooseStringQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactSchema = exports.ContactSchema = new _mongoose.Schema({
				email: {
								type: String,
								lowercase: true,
								trim: true,
								index: true,
								unique: true,
								required: true
				},
				firstname: {
								type: String,
								lowercase: true,
								trim: true,
								unique: true,
								required: true
				},
				lastname: {
								type: String,
								lowercase: true,
								trim: true,
								unique: true,
								required: false
				},
				phonenumber: {
								type: String,
								trim: true,
								index: true,
								unique: true,
								required: true
				},
				user: {
								type: _mongoose.Schema.Types.ObjectId,
								ref: 'User'
				}

}, { collection: 'contacts' });
ContactSchema.plugin(_mongooseTimestamp2.default);
ContactSchema.plugin(_mongooseStringQuery2.default);

ContactSchema.index({ email: 1, phone_number: 1 });
module.exports = exports = _mongoose2.default.model('Contact', ContactSchema);
exports.default = _mongoose2.default.model('Contact', ContactSchema);