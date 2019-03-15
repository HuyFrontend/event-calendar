import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

const HeaderWeekDays = ({weekdays, title}) => (
    <header className='weekdays-header'>
        <h4 className="display-4 mb-4 text-center">{title}</h4>
        <div className="row p-1 bg-dark text-white d-none d-sm-none d-md-flex">
            {weekdays.map((weekday, i) => (
                <h5 className="col-sm p-1 text-center" key={i}>{weekday}</h5>
            ))}
        </div>
    </header>
);

HeaderWeekDays.propTypes = {
    weekdays: PropTypes.array,
    title: PropTypes.string
};

export default HeaderWeekDays;