import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { addEvent, actionTypes as eventActionsTypes } from '../EventActions';
import { actionTypes as notificationActionsTypes } from '../../Notifications/NotificationActions';

const mockStore = configureMockStore([thunk]);

describe('Add event action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('creates ADD_EVENT_SUCCES after succesfuly adding event', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {}
            });
        });

        const store = mockStore({});

        return store.dispatch(addEvent({})).then(() => {
            expect(store.getActions()).toContainEqual({ type: eventActionsTypes.ADD_EVENT_SUCCESS });
        });
    });

    it('creates ADD_EVENT_FAIL when adding event failed', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {}
            });
        });

        const store = mockStore({});

        return store.dispatch(addEvent({})).then(() => {
            expect(store.getActions()).toContainEqual({ type: eventActionsTypes.ADD_EVENT_FAIL });
        });
    });

    it('creates success notification after succesfuly adding event', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {}
            });
        });

        const store = mockStore({});

        return store.dispatch(addEvent({})).then(() => {
            expect(store.getActions()).toContainEqual({ 
                type: notificationActionsTypes.ADD_NEW_NOTIFICATION,
                notificationId: expect.any(Number),
                notificationType: 'success',
                message: 'You have succesfully added event!'
            });
        });
    });

    it('creates error notification when adding event failed', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 500,
                response: {}
            });
        });

        const store = mockStore({});

        return store.dispatch(addEvent({})).then(() => {
            expect(store.getActions()).toContainEqual({ 
                type: notificationActionsTypes.ADD_NEW_NOTIFICATION,
                notificationId: expect.any(Number),
                notificationType: 'error',
                message: 'There was some issues with adding new event.'
            });
        });
    });

});