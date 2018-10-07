'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _EventResolver = require('../resolver/EventResolver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Event resolver', function () {
    var EventMock = function EventMock(_ref) {
        var firstName = _ref.firstName,
            lastName = _ref.lastName,
            email = _ref.email,
            eventDate = _ref.eventDate;

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventDate = eventDate;
    };
    EventMock.find = function () {};
    EventMock.prototype.save = function () {
        Promise.resolve(undefined);
    };

    var eventResolver = new _EventResolver.EventResolver(EventMock);

    it('should be defined', function () {
        expect(eventResolver).toBeDefined();
    });

    describe('get events', function () {
        it('should find all events', function (done) {
            spyOn(EventMock, 'find');

            eventResolver.getEvents().then(function () {
                expect(EventMock.find).toHaveBeenCalled();
                done();
            });
        });
    });

    describe('addEvent', function () {
        it('should return new event after save', function () {
            spyOn(_validator2.default, 'isEmpty').and.returnValue(false);
            spyOn(_validator2.default, 'isEmail').and.returnValue(true);

            var dateNow = new Date();
            eventResolver.addEvent({
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'test@mail.com',
                eventDate: dateNow
            }).then(function (result) {
                expect(result.firstName).toBe('testFirstName');
                expect(result.lastName).toBe('testLastName');
                expect(result.email).toBe('test@mail.com');
                expect(result.eventDate).toBe(dateNow);
            });
        });

        it('should throw custom error if firstName, lastName, email or eventDate is not presented', function (done) {
            spyOn(_validator2.default, 'isEmpty').and.returnValue(true);
            spyOn(_validator2.default, 'isEmail').and.returnValue(true);

            var validationErrors = {
                firstName: ['First name must not be empty.'],
                lastName: ['Last name must not be empty.'],
                email: ['Email must not be empty.'],
                eventDate: ['Event date must not be empty.']
            };

            eventResolver.addEvent({}).catch(function (err) {
                expect(err.message).toBe('The request is invalid.');
                expect(err.state).toEqual(validationErrors);
                done();
            });
        });

        it('should throw custom error when email is not valid', function (done) {
            spyOn(_validator2.default, 'isEmpty').and.returnValue(false);
            spyOn(_validator2.default, 'isEmail').and.returnValue(false);

            var validationErrors = {
                email: ['Email is invalid.']
            };

            eventResolver.addEvent({}).catch(function (err) {
                expect(err.message).toBe('The request is invalid.');
                expect(err.state).toEqual(validationErrors);
                done();
            });
        });

        it('should throw custom error when mongoose save falis', function (done) {
            spyOn(_validator2.default, 'isEmpty').and.returnValue(false);
            spyOn(_validator2.default, 'isEmail').and.returnValue(true);

            var validationErrors = {
                event: ['Could not save new event.']
            };

            spyOn(EventMock.prototype, 'save').and.callFake(function () {
                throw new Error();
            });

            eventResolver.addEvent({}).catch(function (err) {
                expect(err.message).toBe('The request is invalid.');
                expect(err.state).toEqual(validationErrors);
                done();
            });
        });
    });
});