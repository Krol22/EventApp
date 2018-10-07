import { Event } from './Event';

describe('Event', () => {
    it('should be defined', () => {
        expect(Event).toBeDefined();
    });

    describe('event', () => {
        it('should be invalid if first name is empty', (done) => {
            let event = new Event();

            event.validate((err) => {
                expect(err.errors.firstName).toBeDefined();
                done();
            });
        });
        it('should be invalid if last name is empty', (done) => {
            let event = new Event();

            event.validate((err) => {
                expect(err.errors.lastName).toBeDefined();
                done();
            });
        });
        it('should be invalid if email is empty', (done) => {
            let event = new Event();

            event.validate((err) => {
                expect(err.errors.email).toBeDefined();
                done();
            });
        });
        it('should be invalid if eventDate is empty', (done) => {
            let event = new Event();

            event.validate((err) => {
                expect(err.errors.eventDate).toBeDefined();
                done();
            });
        });
    });
});
