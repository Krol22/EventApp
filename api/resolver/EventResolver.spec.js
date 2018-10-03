import validator from 'validator';
import { EventResolver } from '../resolver/EventResolver';

describe('Event resolver', () => {
    let EventMock = function({firstName, lastName, email, eventDate}) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventDate = eventDate;
    };
    EventMock.find = () => {};
    EventMock.prototype.save = () => { Promise.resolve(this); };

    let eventResolver = new EventResolver(EventMock);

    it('should be defined', () => {
        expect(eventResolver).toBeDefined();
    });

    describe('get events', () => {
        it('should find all events', (done) => {
            spyOn(EventMock, 'find');

            eventResolver.getEvents().then(() => {
                expect(EventMock.find).toHaveBeenCalled();
                done();
            });

        });
    });

    describe('addEvent', () => {
        it('should return new event after save', () => {
            spyOn(validator, 'isEmpty').and.returnValue(false);
            spyOn(validator, 'isEmail').and.returnValue(true);

            let dateNow = new Date();
            eventResolver.addEvent({
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'test@mail.com',
                eventDate: dateNow
            }).then((result) => {
                expect(result.firstName).toBe('testFirstName');
                expect(result.lastName).toBe('testLastName');
                expect(result.email).toBe('test@mail.com');
                expect(result.eventDate).toBe(dateNow);
            });

        });

        it('should throw custom error if firstName, lastName, email or eventDate is not presented', (done) => {
            spyOn(validator, 'isEmpty').and.returnValue(true);
            spyOn(validator, 'isEmail').and.returnValue(true);

            let validationErrors = {
                firstName: [ 'First name must not be empty.' ],
                lastName: [ 'Last name must not be empty.' ],
                email: [ 'Email must not be empty.' ],
                eventDate: [ 'Event date must not be empty.' ],
            };

            eventResolver
            .addEvent({})
            .catch(err => {
                expect(err.message).toBe('The request is invalid.');
                expect(err.state).toEqual(validationErrors);
                done();
            });
        });

        it('should throw custom error when email is not valid', (done) => {
            spyOn(validator, 'isEmpty').and.returnValue(false);
            spyOn(validator, 'isEmail').and.returnValue(false);

            let validationErrors = { 
                email: [ 'Email is invalid.' ]
            };

            eventResolver
            .addEvent({})
            .catch(err => {
                expect(err.message).toBe('The request is invalid.');
                expect(err.state).toEqual(validationErrors);
                done();
            });
        });

        it('should throw custom error when mongoose save falis', (done) => {
            spyOn(validator, 'isEmpty').and.returnValue(false);
            spyOn(validator, 'isEmail').and.returnValue(true);

            let validationErrors = { 
                event: ['Could not save new event.']
            };

            spyOn(EventMock.prototype, 'save').and.callFake(() => {
                throw new Error();
            });

            eventResolver
            .addEvent({})
            .catch(err => {
                expect(err.message).toBe('The request is invalid.');
                expect(err.state).toEqual(validationErrors);
                done();
            });
        });
    });
});
