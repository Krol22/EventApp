import axios from 'axios';
import { createNotification } from '../Notifications/NotificationActions';

const API_URL = 'http://localhost:4000/graphql';

export const actionTypes = {
    ADD_EVENT: 'ADD_EVENT',
    ADD_EVENT_FAIL: 'ADD_EVENT_FAIL',
    ADD_EVENT_SUCCESS: 'ADD_EVENT_SUCCESS'
}

const ADD_EVENT_MUTATION = `
    mutation addEvent($firstName: String!, $lastName: String!, $email: String!, $eventDate: String!){
        addEvent (firstName: $firstName, lastName: $lastName, email: $email, eventDate: $eventDate) {
            firstName,
            lastName,
            email,
            eventDate
        }
    }
`;

export function addEvent({firstName, lastName, email, eventDate}) {
    return (dispatch) => {
        dispatch({type: actionTypes.ADD_EVENT});
        return axios
            .post(`${API_URL}/`, {
                query: ADD_EVENT_MUTATION,
                variables: {
                    firstName,
                    lastName,
                    email,
                    eventDate
                }
            })
            .then(() => {
                dispatch({type: actionTypes.ADD_EVENT_SUCCESS});
                dispatch(createNotification({
                    notificationType: 'success',
                    message: 'You have succesfully added event!'
                }));
            })
            .catch(() => {
                dispatch({type: actionTypes.ADD_EVENT_FAIL});
                dispatch(createNotification({
                    notificationType: 'error',
                    message: 'There was some issues with adding new event.'
                }));
            });
    } 
};