"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.update = exports.create = exports.get = exports.all = undefined;

var _contact2 = require("../entities/contact");

var _contact3 = _interopRequireDefault(_contact2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A simple CRUD controller for contacts
 * Create the necessary controller methods 
 */

var all = exports.all = function all(req, res) {
    _contact3.default.find({ user: req.user._id }).exec(function (err, contact) {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "User doesnt exist"
            });
        }
        return res.status(200).json({
            status: "success",
            data: contact
        });
    });
};
var get = exports.get = function get(req, res) {
    var id = req.params.contactId;
    _contact3.default.find({ _id: id, user: req.user._id }, function (err, contact) {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "Contact doesnt exist"
            });
        }
        return res.status(200).json({
            status: "success",
            data: contact
        });
    });
};

var create = exports.create = function create(req, res) {
    var _Contact = new _contact3.default(req.body);
    _Contact['user'] = req.user._id;
    _Contact.save(_Contact, function (err, contact) {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "incorrect_entry/double"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "contact_added",
            data: contact
        });
    });
};
var update = exports.update = function update(req, res) {
    var _contact = req.body;
    var id = req.param.contactId;
    var query = { id: id };
    _contact3.default.findOneAndUpdate(query, { $set: _contact }, {
        returnNewDocument: true
    }, function (err, contact) {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "Failed"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "contact_updated",
            data: contact
        });
    });
};
var remove = exports.remove = function remove(req, res) {
    var id = req.param.contactId;
    var query = { id: id };
    _contact3.default.findOneAndRemove(query, function (err, contact) {
        if (err) {
            return res.status(401).json({
                status: "error",
                message: "Failed"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "contact_deleted",
            data: contact
        });
    });
};

exports.default = {
    //get all contacts for a user
    all: all,
    // get a single contact
    get: get,
    // create a single contact
    create: create,
    // update a single contact
    update: update,
    // remove a single contact
    remove: remove
};