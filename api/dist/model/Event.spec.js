'use strict';

var _Event = require('./Event');

describe('Event', function () {
    it('should be defined', function () {
        expect(_Event.Event).toBeDefined();
    });

    describe('event', function () {
        it('should be invalid if first name is empty', function (done) {
            var event = new _Event.Event();

            event.validate(function (err) {
                expect(err.errors.firstName).toBeDefined();
                done();
            });
        });
        it('should be invalid if last name is empty', function (done) {
            var event = new _Event.Event();

            event.validate(function (err) {
                expect(err.errors.lastName).toBeDefined();
                done();
            });
        });
        it('should be invalid if email is empty', function (done) {
            var event = new _Event.Event();

            event.validate(function (err) {
                expect(err.errors.email).toBeDefined();
                done();
            });
        });
        it('should be invalid if eventDate is empty', function (done) {
            var event = new _Event.Event();

            event.validate(function (err) {
                expect(err.errors.eventDate).toBeDefined();
                done();
            });
        });
    });
});