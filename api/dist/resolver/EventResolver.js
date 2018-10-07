'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EventResolver = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _CustomError = require('../error/CustomError');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventResolver = exports.EventResolver = function () {
    function EventResolver(Event) {
        _classCallCheck(this, EventResolver);

        this.Event = Event;
    }

    _createClass(EventResolver, [{
        key: 'getEvents',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.Event.find();

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getEvents() {
                return _ref.apply(this, arguments);
            }

            return getEvents;
        }()
    }, {
        key: 'addEvent',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                    firstName = _ref3.firstName,
                    lastName = _ref3.lastName,
                    email = _ref3.email,
                    eventDate = _ref3.eventDate;

                var errors, newEvent;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                errors = [];


                                if (_validator2.default.isEmpty(firstName)) {
                                    errors.push({ key: 'firstName', message: 'First name must not be empty.' });
                                }

                                if (_validator2.default.isEmpty(lastName)) {
                                    errors.push({ key: 'lastName', message: 'Last name must not be empty.' });
                                }

                                if (_validator2.default.isEmpty(email)) {
                                    errors.push({ key: 'email', message: 'Email must not be empty.' });
                                } else if (!_validator2.default.isEmail(email)) {
                                    errors.push({ key: 'email', message: 'Email is invalid.' });
                                }

                                if (_validator2.default.isEmpty(eventDate)) {
                                    errors.push({ key: 'eventDate', message: 'Event date must not be empty.' });
                                }

                                if (!errors.length) {
                                    _context2.next = 7;
                                    break;
                                }

                                throw new _CustomError.CustomError(errors);

                            case 7:
                                newEvent = new this.Event({ firstName: firstName, lastName: lastName, email: email, eventDate: eventDate });
                                _context2.prev = 8;
                                _context2.next = 11;
                                return newEvent.save();

                            case 11:
                                _context2.next = 16;
                                break;

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](8);
                                throw new _CustomError.CustomError([{ key: 'event', message: 'Could not save new event.' }]);

                            case 16:
                                return _context2.abrupt('return', newEvent);

                            case 17:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[8, 13]]);
            }));

            function addEvent() {
                return _ref2.apply(this, arguments);
            }

            return addEvent;
        }()
    }]);

    return EventResolver;
}();