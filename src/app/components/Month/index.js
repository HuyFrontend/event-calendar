import React, { Component } from 'react';
import moment from 'moment';
import HeaderWeekDays from '../HeaderWeekDays';
import SingleDay from '../Day';
import EventModal from '../EventModal';
class Month extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curMonth: {},
            weekdays: [],
            monthLength: 0
        };
    }
    componentDidMount() {
        this.createState();
    }
    createState() {
        // const curMonth = moment('2019-04').format('YYYY-MM');
        const curMonth = moment().format('YYYY-MM');
        this.setState(
            {
                curMonth: {
                    date: curMonth,
                    name: moment(curMonth).format('MMMM YYYY'),
                    days: moment(curMonth).daysInMonth(),
                    editDay: null
                },
                weekdays: moment.weekdays()
            },
            () => {
            }
        );
    }
    buildDays = () => {
        const days = [];
        const props = {
        };
        const todayFormat = moment().format('YYYYMMDD');
        let firstDayIndex = -1;
        for (let i = 1; i <= this.state.curMonth.days; i++) {
            let date = `${this.state.curMonth.date}-${('0' + i).slice(-2)}`;
            props['date'] = date;
            props['dayOrder'] = i;
            if (i === 1) {
                firstDayIndex = parseInt(moment(date).startOf('month').format('d'), 10);
                props['firstDayIndex'] = firstDayIndex;
            } else {
                delete props['firstDayIndex'];
            }
            const thatDayFormat = moment(date).format('YYYYMMDD');
            if (parseInt(thatDayFormat) < parseInt(todayFormat)) {
                props.disabled = true;
            } else {
                delete props['disabled'];
            }
            if (parseInt(thatDayFormat) === parseInt(todayFormat)) {
                props.isToday = true;
            } else {
                delete props['isToday'];
            }
            props['dayLabel'] = moment(date).format('dddd');
            days.push(<SingleDay key={i} {...props} />);
        }
        return days;
    }
    render() {
        const weekdays = this.state.weekdays;
        const monthLength = this.buildDays();
        const monthTitle = this.state.curMonth.name;
        return (
            <div className={`single-month`}>
                <div className="container-fluid">
                    <HeaderWeekDays weekdays={weekdays} title={monthTitle}/>
                    <div className="row border border-right-0 border-bottom-0">
                        {monthLength}
                    </div>
                    <EventModal isModal={false}/>
                </div>
            </div>
        );
    }
}

export default Month;
