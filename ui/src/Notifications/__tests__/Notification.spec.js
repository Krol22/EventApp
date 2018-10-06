import React from 'react';
import { Notification } from '../Notification';
import renderer from 'react-test-renderer';

describe('Notification', () => {
    it('should properly render success notification', () => {
        const successNotificaiton = renderer.create(
            <Notification type="success" message="Your test success message" />
        );

        let tree = successNotificaiton.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should properly render error notification', () => {
        const errorNotification = renderer.create(
            <Notification type="error" message="Your test error message" />
        );

        let tree = errorNotification.toJSON();
        expect(tree).toMatchSnapshot();
    });

});