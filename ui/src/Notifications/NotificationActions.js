export const actionTypes = {
    ADD_NEW_NOTIFICATION: 'ADD_NEW_NOTIFICATION',
    HIDE_NOTIFICATION: 'HIDE_NOTIFICATION',
};

let notificationId = 0;

export function createNotification({notificationType, message}) {
    return function(dispatch){
        let tempId = notificationId++;

        dispatch({ 
                type: actionTypes.ADD_NEW_NOTIFICATION,
                notificationId: tempId,
                notificationType,
                message,
            });


        setTimeout(() => {
            dispatch({
                type: actionTypes.HIDE_NOTIFICATION,
                notificationId: tempId
            });
        }, 5000);
    };
}