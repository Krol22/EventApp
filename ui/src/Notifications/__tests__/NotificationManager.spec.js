import React from 'react';
import { NotificationManager } from '../NotificationManager';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

import configureStore from 'redux-mock-store';

describe('NotificationManager', () => {
    const initialState = {
        notification: {
            notificationId: 0,
            notificationType: 'success',
            message: 'test_message',
            notificationToHideId: 0,
        }
    };
    const mockStore = configureStore();

    let wrapper;
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = shallow(<NotificationManager store={store} />);
    });

    it('should add notification when id property changes', () => {
        let id = 1;
        let type = 'test_type_1';
        let message = 'test_message_1';

        let notificationManager = wrapper.dive();
        let instance = notificationManager.instance();
        
        notificationManager.setProps({ id, type, message }); 
        let notifications = instance.state.notifications;

        expect(notifications).toContainEqual({
            id: 1,
            type: 'test_type_1',
            message: 'test_message_1',
        });
    });

    it('should hide notification when hideId property changes', () => {
        let id = 1;
        let type = 'test_type_1';
        let message = 'test_message_1';

        let notificationManager = wrapper.dive();
        let instance = notificationManager.instance();
        
        notificationManager.setProps({ id, type, message }); 
        let notifications = instance.state.notifications;

        expect(notifications).toContainEqual({
            id: 1,
            type: 'test_type_1',
            message: 'test_message_1',
        });

        notificationManager.setProps({ hideId: id });
        notificationManager.update();

        notifications = instance.state.notifications;
        expect(notifications.length).toBe(0);
    });
});
