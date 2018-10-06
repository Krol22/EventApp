import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { createNotification, actionTypes as notificationActionTypes } from '../NotificationActions';
import { iterableEquality } from 'expect/build/utils';

jest.useFakeTimers();

const mockStore = configureMockStore([thunk]);

describe('create new notification', () => {

    it('creates ADD_NEW_NOTIFICATION', () => {
        const newNotification = {
            notificationType: 'test_type',
            message: 'test_message'
        };

        const store = mockStore({});

        store.dispatch(createNotification(newNotification));

        expect(store.getActions()).toContainEqual({
            type: notificationActionTypes.ADD_NEW_NOTIFICATION,
            notificationId: expect.any(Number),
            notificationType: newNotification.notificationType,
            message: newNotification.message
        });
    });

    it('creates HIDE_NOTIFICATION after 5000ms', () => {
        const newNotification = {
            notificationType: 'test_type',
            message: 'test_message'
        };

        const store = mockStore({});

        store.dispatch(createNotification(newNotification));

        jest.runAllTimers();

        expect(store.getActions()).toContainEqual({
            type: notificationActionTypes.HIDE_NOTIFICATION,
            notificationId: expect.any(Number),
        });
    });
    
});