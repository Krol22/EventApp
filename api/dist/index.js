'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.app = undefined;

var init = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        app.use((0, _cors2.default)());
                        app.use(_bodyParser2.default.json());
                        app.use(_bodyParser2.default.urlencoded({ extended: true }));
                        app.use('/graphql', (0, _expressGraphql2.default)({
                            schema: schema,
                            rootValue: root,
                            graphiql: true,
                            formatError: function formatError(error) {
                                return {
                                    message: error.message,
                                    state: error.originalError && error.originalError.state,
                                    locations: error.locations,
                                    path: error.path
                                };
                            }
                        }));

                        _context.prev = 4;
                        _context.next = 7;
                        return (0, _db.connectToDb)();

                    case 7:
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](4);

                        console.log('Something went wrong...');

                    case 12:

                        app.listen(4000, function () {
                            return console.log('Server running on localhost:4000/graphql');
                        });

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 9]]);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _graphql = require('graphql');

var _db = require('./model/db');

var _resolver = require('./resolver/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// for loading qraphql schema files
var graphQlFileLoader = require('./graphQLFileLoader.js');
graphQlFileLoader.init();

require('dotenv').config();

var EventSchema = require('./model/Event.graphql');

var schema = (0, _graphql.buildSchema)('\n    ' + EventSchema + '\n\n    type Query {\n        events: [Event] \n    }\n\n    type Mutation {\n        addEvent(firstName: String!, lastName: String!, email: String!, eventDate: String!): Event\n    }\n');

var root = {
    events: _resolver.eventResolver.getEvents.bind(_resolver.eventResolver),
    addEvent: _resolver.eventResolver.addEvent.bind(_resolver.eventResolver)
};

var app = exports.app = (0, _express2.default)();

init();