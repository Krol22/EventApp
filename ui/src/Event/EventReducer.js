import { initialState } from "../store";
import { actionTypes } from './EventActions';

export const EventReducer = (state = initialState, action = {}) => {

    switch(action.type) {
        case actionTypes.ADD_EVENT: 
            return state;
        case actionTypes.ADD_EVENT_FAIL: 
            return state;
        case actionTypes.ADD_EVENT_SUCCESS: 
            return state;
        default: 
            return state;
    }

}