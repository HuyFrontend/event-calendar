import React, { Component } from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { cancelEventCalendar, onChangeEventCalendar, deleteEventCalendar, saveEventCalendar } from '../../stores/allActions';
import { eventStatusArr, eventActions } from '../../constants';
import { timeUnitArr } from '../../helpers';
import SelectOptionCustom from '../../components/SelectOptionCustom';
import { EventModel } from '../../models';
class EventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            min: '',
            hour: '',
            date: '',
            status: '',
            modal: this.props.isModal,
            formValid: false,
        }
        this.toggle = this.toggle.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeHour = this.onChangeHour.bind(this);
        this.onChangeMinute = this.onChangeMinute.bind(this);
    }
    toggle() {
        this.props.dispatch(cancelEventCalendar());
        this.resetState();
    }
    onChangeName(event) {
        const value = event.target.value;
        this.props.eventObj.title = value;
        this.setState({
            title: value
        });
        this.props.dispatch(onChangeEventCalendar(this.props.eventObj));
    }
    onChangeStatus(value) {
        this.props.eventObj.status = value;
        this.props.dispatch(onChangeEventCalendar(this.props.eventObj));
    }
    onChangeHour(value) {
        this.props.eventObj.hour = value;
        this.props.dispatch(onChangeEventCalendar(this.props.eventObj));
    }
    onChangeMinute(value) {
        this.props.eventObj.min = value;
        this.props.dispatch(onChangeEventCalendar(this.props.eventObj));
    }
    onSummit() {
        const { eventType } = this.props;
        if (eventType === eventActions.addEvent) {
            this.onAddEvent();
        } else if (eventType === eventActions.modifyEvent) {
            this.onUpdateEvent();
        }
    }
    onAddEvent() {
        const { eventObj, eventList } = this.props;
        const id = `${eventObj.date}-${eventObj.hour}-${eventObj.min}`;
        const checkSameTime = this.checkingTheSameTime(eventObj);
        if(!checkSameTime) {
            this.props.eventObj.id = id;
            const newList = [...eventList, this.props.eventObj];
            this.props.dispatch(saveEventCalendar(newList));
            this.resetState();
        } else {
            // alert same time
            alert(`Event named ${checkSameTime.title} has been set on this time. Please select and modify it!`);
        }
    }
    onUpdateEvent() {
        const { eventObj, eventList } = this.props;
        if(!this.checkingTheSameTime(eventObj)) {
            const list = eventList.filter(item => {
                if (item.id !== eventObj.id) {
                    return item;
                }
            });
            this.props.dispatch(saveEventCalendar([...list, eventObj]));
            this.resetState();
        }
    }
    checkingTheSameTime({date, hour, min, id}) {
        const { eventList, eventType } = this.props;
        let isExisting = false;
        let checkingObj = {};
        if (eventType === eventActions.addEvent) {
            eventList.filter((item) => {
                if( item.date === date && item.hour === hour && item.min === min) {
                    isExisting = true;
                    checkingObj = Object.assign({}, item);
                }
            });
        } else if (eventType === eventActions.modifyEvent) {
            eventList.filter((item) => {
                if( item.date === date && item.hour === hour && item.min === min && item.id !== id) {
                    isExisting = true;
                }
            });
        }
        if (isExisting) {
            return Object.assign({}, checkingObj, isExisting);
        } else {
            return isExisting;
        }
    }
    deleteEvent() {
        const confirmPopup = confirm(`You really want to delete this event?`);
        if (confirmPopup === true) {
            const {eventList, eventObj } = this.props;
            const newList = eventList.filter(item => {
                if (item.id !== eventObj.id) {
                    return item;
                }
            });
            this.props.dispatch(deleteEventCalendar(newList));
        } else {
            this.toggle();
        }
    }
    resetState() {
        this.setState({
            title: ''
        });
    }
    render() {
        const { eventObj, eventType } = this.props;
        const { title } = this.state;
        let deleteBtn
        if (eventType === eventActions.modifyEvent) {
            deleteBtn = <Button color="danger hide" onClick={this.deleteEvent.bind(this)}>Delete</Button>;
        } else {
            deleteBtn = '';
        }
        return (
            <div>
                <Modal isOpen={this.props.isModal} toggle={this.toggle} className={'event-modal'}>
                    <ModalHeader toggle={this.toggle}>{(eventType==='Add' ? 'New ' : 'Edit ') + `Event`}</ModalHeader>
                    <form>
                        <ModalBody>
                            <div className="form-group">
                                <label htmlFor="eventTitle">Title</label>
                                <input value={eventObj.title ? eventObj.title : title} type="text" className="form-control" id="eventTitle" name="eventTitle" required placeholder="Event Name" maxLength="20" onChange={this.onChangeName}/>
                            </div>
                            <SelectOptionCustom label="Status" elementID="eventStatus" array={eventStatusArr} onChange={this.onChangeStatus} defaultSelected={eventObj.status}/>
                            <div className="row">
                                <div className="col">
                                <SelectOptionCustom label="Hour" elementID="eventHour" array={timeUnitArr(23)} onChange={this.onChangeHour} defaultSelected={eventObj.hour}/>
                                </div>
                                <div className="col">
                                    <SelectOptionCustom label="Minute" elementID="eventMinute" array={timeUnitArr(59)} onChange={this.onChangeMinute} defaultSelected={eventObj.min}/>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="button" onClick={() => this.onSummit()} disabled={!eventObj.title}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            {deleteBtn}
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

EventModal.propTypes = {
    dispatch: PropTypes.func,
    isModal: PropTypes.bool,
    eventType: PropTypes.string,
    eventObj: PropTypes.object,
    eventList: PropTypes.array
}
const mapStateToProps = (state) => {
    const { isModal, eventObj, eventType, eventList } = state.eventCalendar;
    return {
        ...state,
        isModal : isModal ? isModal : false,
        eventObj: Object.assign({}, new EventModel(), eventObj),
        eventType: eventType ? eventType : '',
        eventList: eventList ? eventList : []
    };
}
export default connect(mapStateToProps)(EventModal);