import React from 'react';

import { EventForm } from '../Event/EventForm';
import { NotificationManager } from '../Notifications/NotificationManager';

export const EventPage = () => {
    return (
        <div className="event-form">
            <NotificationManager></NotificationManager>
            <h1 className="heading-primary u-margin-bottom-50">Create new event</h1>
            <EventForm></EventForm>
        </div>
    )
}