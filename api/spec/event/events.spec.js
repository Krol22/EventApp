// automated tests for events

// find events

// add new event

// checking validation
import request from 'supertest';

import { app } from '../../index.js';
import { addData, removeData } from '../support/dbHelper';

const agent = request.agent(app);

describe('Event api tests', () => {
    afterEach((done) => {
       removeData()
            .then(() => {
                done();
            });
    });

    it('should return all events', (done) => {
        addData()
            .then(() => {
                agent
                .post('/graphql')
                .send({
                    query: `
                    {
                        events {
                        firstName,
                        lastName,
                        email,
                        eventDate
                        }
                    }
                    `
                })
                .end((err, res) => {
                    let events = res.body.data.events;
                    expect(events.length).toBe(3);
                    expect(events).toContain({
                        firstName: 'firstName_0',
                        lastName: 'lastName_0',
                        email: 'email0@mail.com',
                        eventDate: 'eventDate_0',
                    });
                    expect(events).toContain({
                        firstName: 'firstName_1',
                        lastName: 'lastName_1',
                        email: 'email1@mail.com',
                        eventDate: 'eventDate_1',
                    });
                    expect(events).toContain({
                        firstName: 'firstName_2',
                        lastName: 'lastName_2',
                        email: 'email2@mail.com',
                        eventDate: 'eventDate_2',
                    });

                    done();
                });
            });
    });

    describe('add new event', () => {
        it('should add new event and return it', (done) => {
            agent
                .post('/graphql')
                .send({
                    query: `
                        mutation {
                            addEvent (firstName:"first_name", lastName:"last_name", email:"email@mail.com", eventDate:"eventDate") {
                            firstName,
                            lastName,
                            email,
                            eventDate
                            }
                        }
                    `
                })
                .end((err, res) => {
                    const newEvent = res.body.data.addEvent;
                    expect(newEvent).toEqual({
                        firstName: 'first_name',
                        lastName: 'last_name',
                        email: 'email@mail.com',
                        eventDate: 'eventDate'
                    });
                    done();
                });
        });

        it('should throw validation errors when properties are invalid', (done) => {
            agent
                .post('/graphql')
                .send({ 
                    query: `
                        mutation {
                            addEvent (firstName:"", lastName:"", email:"email", eventDate:"") {
                                firstName,
                                lastName,
                                email,
                                eventDate
                            }
                        }
                    `
                })
                .end((err, res) => {
                    const errors = res.body.errors[0];
                    expect(errors.message).toBe('The request is invalid.');
                    expect(errors.state.firstName[0]).toBe('First name must not be empty.');
                    expect(errors.state.lastName[0]).toBe('Last name must not be empty.');
                    expect(errors.state.email[0]).toBe('Email is invalid.');
                    expect(errors.state.eventDate[0]).toBe('Event date must not be empty.');
                    done();
                });
        });
    });
    

});
