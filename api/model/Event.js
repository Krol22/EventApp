const mongoose = require('mongoose');

const Event = new mongoose.model('Event', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    eventDate: { type: Date, required: true }
});

const EventResolver = {
    getEvents: async () => {
        return await Event.find();
    },
    addEvent: async ({firstName, lastName, email, eventName}) => {
        const newEvent = new Event(firstName, lastName, email, eventName);
        await newEvent.save();
        return newEvent;
    }
};

module.exports.Event = Event;
module.exports.getEvents = EventResolver.getEvents;
module.exports.addEvent = EventResolver.addEvent;


