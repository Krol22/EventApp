import React from 'react';

export const NotificationTypes = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

export const Notification = ({type, message}) => {
    const classNames = `notification notification--${type.toLowerCase()}`;

    return (
        <div className={classNames}>
            <span className="notification__message">{message}</span>
        </div>
    );
};