import expect from 'expect';

import { NotificationReducer } from '../NotificationReducer';
import { actionTypes } from '../NotificationActions';

const defaultTestState = {
    test_prop: 'test'
};

describe('NotificationReducer', () => {

    it('should return new notification on ADD_NEW_NOTIFICATION action', () => {
        const newNotificationAction = {
            type: actionTypes.ADD_NEW_NOTIFICATION,
            notificationType: 'test_type',
            notificationId: -1,
            message: 'test_message'
        };

        expect(NotificationReducer(defaultTestState, newNotificationAction)).toEqual({
            notificationType: 'test_type',
            notificationId: -1,
            message: 'test_message',
            test_prop: 'test'
        });
    });

    it('should return notification to hide id on HIDE_NOTIFICATION action', () => {
        const hideNotificationAction = {
            type: actionTypes.HIDE_NOTIFICATION,
            notificationId: -1,
        };

        expect(NotificationReducer(defaultTestState, hideNotificationAction)).toEqual({
            notificationToHideId: -1,
            test_prop: 'test'
        });
    });

    it('should return state when no action is handeled', () => {
        expect(NotificationReducer(defaultTestState, {})).toEqual(defaultTestState);
    });
});