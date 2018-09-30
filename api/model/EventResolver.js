import validator from 'validator';

import { Event } from './Event';
import { CustomError } from '../error/CustomError';

export const EventResolver = {
    getEvents: async () => {
        return await Event.find();
    },
    addEvent: async ({firstName, lastName, email, eventDate}) => {
        let errors = [];

        if(validator.isEmpty(firstName)) {
            errors.push({ key: 'firstName', message: 'First name must not be empty.' });
        } 

        if(validator.isEmpty(lastName)) {
            errors.push({ key: 'lastName', message: 'Last name must not be empty.' });
        }

        if(validator.isEmpty(email)) {
            errors.push({ key: 'email', message: 'Email must not be empty.' });
        } else if(!validator.isEmail(email)) {
            errors.push({ key: 'email', message: 'Email is invalid.' });
        }

        if(validator.isEmpty(eventDate)) {
            errors.push({ key: 'eventDate', message: 'Event date must not be empty.' });
        }

        if(errors.length) throw new CustomError(errors);

        const newEvent = new Event({ firstName, lastName, email, eventDate });
        try {
            await newEvent.save();
        } catch(err) {
            throw new CustomError([{ key: 'event', message: 'Could not save new event.' }]);
        }

        return newEvent;
    }
};