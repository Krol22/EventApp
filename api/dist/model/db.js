'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connectToDb = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connected = _chalk2.default.bold.cyan;
var error = _chalk2.default.bold.yellow;
var disconnected = _chalk2.default.bold.red;
var termination = _chalk2.default.bold.magenta;

var connectToDb = exports.connectToDb = function connectToDb() {
    var dbUrl = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL;

    _mongoose2.default.connect(dbUrl, { useNewUrlParser: true });
    _mongoose2.default.connection.on('disconnected', function () {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function () {
        _mongoose2.default.connection.close(function () {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        });
    });

    return new Promise(function (resolve, reject) {
        _mongoose2.default.connection.on('connected', function () {
            console.log(connected('Mongoose default connection is open to ' + dbUrl));
            resolve();
        });

        _mongoose2.default.connection.on('error', function (err) {
            console.log(error('Mongoose default connection has occured ' + err + ' error'));
            reject(err);
        });
    });
};