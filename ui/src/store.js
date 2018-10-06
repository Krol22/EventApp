import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { EventReducer } from './Event/EventReducer';
import { NotificationReducer } from './Notifications/NotificationReducer';

export const initialState = {
    form: {
        firstName: '',
        lastName: '',
        email: '',
        eventDate: '',
    },
    notification: {
        notificationId: -1,
        notificationType: '',
        message: ''
    }
}

const reducers = combineReducers({
    form: EventReducer,
    notification: NotificationReducer
});

export const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
);