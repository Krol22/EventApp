import mongoose from 'mongoose';

export const Event = mongoose.model('Event', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    eventDate: { type: String, required: true }
});