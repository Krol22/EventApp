import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Notification } from './Notification';

class NotificationManagerCl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id !== this.props.id) {
            const newNotification = ({
                id: nextProps.id,
                type: nextProps.type,
                message: nextProps.message
            });

            this.setState({
                notifications: [...this.state.notifications, newNotification]
            });
        }

        if(nextProps.hideId !== this.props.hideId) {
            this.setState({
                notifications: this.state.notifications.filter((notification) => {
                                    return notification.id !== nextProps.hideId; 
                                }),
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <ul className="notification-list">
                    { this.state.notifications.map(notification => <Notification key={notification.id} {...notification} />) }
                </ul> 
            </React.Fragment>
        )
    }

} 

function mapStateToProps(state) {
    return {
        id: state.notification.notificationId,
        type: state.notification.notificationType,
        hideId: state.notification.notificationToHideId,
        message: state.notification.message
    }
}

export const NotificationManager = connect(mapStateToProps)(NotificationManagerCl);

