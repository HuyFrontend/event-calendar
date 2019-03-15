import { combineReducers } from 'redux';
import CONSTANT_ACTION from './constantActions';
import { EventModel } from '../models';
import {testEventList } from '../constants';
const reducerEventCalendar = (state = {  isModal: false, eventList: testEventList, eventObj: new EventModel(), eventType: ''}, action) => {
	switch (action.type) {
		case CONSTANT_ACTION.EVENT_TYPE_NEW:
			return { ...state, eventObj: action.payLoad, isModal: true, eventType: 'Add' };
		case CONSTANT_ACTION.EVENT_TYPE_EDIT:
			return { ...state, eventObj: action.payLoad, isModal: true, eventType: 'Modify' };
		case CONSTANT_ACTION.EVENT_CANCEL:
			return { ...state, eventObj: new EventModel(), isModal: false, eventType: '' };
        case CONSTANT_ACTION.EVENT_ONCHANGE:
			return { ...state, eventObj: action.payLoad };
		case CONSTANT_ACTION.EVENT_SAVE:
            return { ...state, eventList: action.payLoad, isModal: false, eventType: '', eventObj: new EventModel() };
		case CONSTANT_ACTION.EVENT_DELETE:
			return { ...state, eventList: action.payLoad, eventObj: new EventModel(), isModal: false, eventType: '' };
		default:
            return state;
    }
};


const allReducers = combineReducers({
	eventCalendar: reducerEventCalendar
});
export default allReducers;