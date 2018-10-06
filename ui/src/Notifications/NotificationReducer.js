import { actionTypes as notificationType } from '../Notifications/NotificationActions';
import { initialState } from '../store';

export const NotificationReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case notificationType.ADD_NEW_NOTIFICATION:
            return {
                ...state,
                notificationType: action.notificationType,
                notificationId: action.notificationId,
                message: action.message
            };
        case notificationType.HIDE_NOTIFICATION: 
            return {
                ...state,
                notificationToHideId: action.notificationId
            }
        default:
            return state;
    }
};