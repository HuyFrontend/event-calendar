import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { sortArrayByKey } from '../../helpers';
const PerDayEvents = ({events, onClick = null}) => {
    const eventArr = [];
    const sortHourArray = sortArrayByKey(events, 'hour');
    sortHourArray.filter((item, index) => {
        eventArr.push(
            <a value={item.id} key={index}  title={item.title} onClick={() => handleClick(item)} className={`event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small text-white ${item.status==1 ? 'bg-success' : (item.status==2 ? 'bg-primary' : 'bg-warning')}`}>
                {item.title}</a>
        );
    });
    const handleClick = (eventItem) => {
        if (eventItem) {
            onClick(eventItem);
        }
    };
    return (
        <div className="event-list">
            {eventArr}
        </div>
    );
}
PerDayEvents.propTypes = {
    events: PropTypes.array,
    onClick: PropTypes.func
};
export default PerDayEvents;
