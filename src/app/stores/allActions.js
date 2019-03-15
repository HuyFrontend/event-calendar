import CONSTANT_ACTION from './constantActions';
import { EventModel } from '../models';

export const cancelEventCalendar = (eventObj = new EventModel()) => {
    return (dispatch) => {
        return dispatch({ type: CONSTANT_ACTION.EVENT_CANCEL, payLoad: eventObj});
    }
};
export const addEventCalendar = (actionType, eventObj = new EventModel()) => {
    return (dispatch) => {
        return dispatch({ type: actionType, payLoad: eventObj});
    }
};
export const onChangeEventCalendar = (eventObj = new EventModel()) => {
    return (dispatch) => {
        return dispatch({ type: CONSTANT_ACTION.EVENT_ONCHANGE, payLoad: eventObj});
    }
};
export const saveEventCalendar = (eventList = []) => {
    return (dispatch) => {
        return dispatch({ type: CONSTANT_ACTION.EVENT_SAVE, payLoad: eventList });
    }
};
export const deleteEventCalendar = (eventList = []) => {
    return (dispatch) => {
        return dispatch({ type: CONSTANT_ACTION.EVENT_DELETE, payLoad: eventList});
    }
};