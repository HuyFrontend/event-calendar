import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import CONS_ACTION from '../../stores/constantActions';
import { addEventCalendar } from '../../stores/allActions';
import { connect } from 'react-redux';
import { EventModel } from '../../models';
import { eventStatusArr } from '../../constants';
import { timeUnitArr } from '../../helpers';
import PerDayEvents from '../PerDayEvents';
import moment from 'moment';
class SingleDay extends Component {
    constructor(props) {
        super(props);
    }
    popupNewEvent() {
        this.props.dispatch(addEventCalendar(CONS_ACTION.EVENT_TYPE_NEW, this.initEventObj()));
    }
    initEventObj() {
        const status = eventStatusArr[0].id.toString();
        const hour = timeUnitArr(23)[0].id.toString();
        const minute = timeUnitArr(59)[0].id.toString();
        const event = new EventModel({
            date: this.props.date,
            status: status,
            min: minute,
            hour: hour,
            title: '',
            id: ''
        });
        return event;
    }
    filterEvents(eventList, date) {
        const dayEvents = eventList.filter(item => item.date === date);
        return dayEvents;
    }
    onClickEventItem(eventItem) {
        if (eventItem) {
            this.props.dispatch(addEventCalendar(CONS_ACTION.EVENT_TYPE_EDIT, eventItem));
        }
    }
    componentDidMount() {
        const checkTodayEvent = this.hasTodayEvents();
        if (checkTodayEvent) {
            setInterval( () => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
            },1000)
        }
    }
    hasTodayEvents() {
        const hasEvent = false;
        const today = moment().format('YYYY-MM-DD');
        const { eventList } = this.props;
        const todayEventArr = this.filterEvents(eventList, today);
        if (todayEventArr.length) {
            return {
                ...todayEventArr,
                hasEvent: true
            };
        } else {
            return hasEvent;
        }
    }
    render() {
        const { dayOrder, dayLabel, firstDayIndex, isToday, disabled, date, eventList } = this.props;
        const dayEventArr = this.filterEvents(eventList, date);
        return (
            <div className={`day col-md p-2 border border-left-0 border-top-0- text-truncate ${firstDayIndex ? 'first-index-' + firstDayIndex : ''} ${isToday ? 'today' : ''} ${disabled ? 'disabled' : 'enabled'}`}>
                <h5 className="row align-items-center">
                    <span className="date col-1">{dayOrder}</span>
                    <small className="col d-md-none text-center text-muted">{dayLabel}</small>
                    <span className="col-1"></span>
                </h5>
                <PerDayEvents events={dayEventArr} onClick={this.onClickEventItem.bind(this)}/>
                <a className="btn-add-new-event small bg-info text-white" onClick={this.popupNewEvent.bind(this)}>
                    Add Event
                </a>
            </div>
        );
    }
}

SingleDay.propTypes = {
    firstDayIndex: PropTypes.any,
    dayOrder: PropTypes.number,
    dayLabel: PropTypes.string,
    dispatch: PropTypes.func,
    date: PropTypes.string,
    isToday: PropTypes.bool,
    disabled: PropTypes.bool,
    eventList: PropTypes.array
}
const mapStateToProps = (state) => {
    const { eventList } = state.eventCalendar;
    return {
        ...state,
        eventList: eventList ? eventList : []
    };
}
export default connect(mapStateToProps)(SingleDay);
