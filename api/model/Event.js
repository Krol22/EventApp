import mongoose from 'mongoose';

export const Event = mongoose.model('Event', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    eventDate: { type: String, required: true }
});

export const EventResolver = {
    getEvents: async () => {
        return await Event.find();
    },
    addEvent: async ({firstName, lastName, email, eventDate}) => {
        const newEvent = new Event({ firstName, lastName, email, eventDate });
        await newEvent.save();
        return newEvent;
    }
};

