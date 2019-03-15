import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
const SelectOptionCustom = ({array = [], label = '', elementID = '', defaultSelected = '', onChange = null}) => {
    const optionArr = [];
    array.filter((item, index) => {
        optionArr.push(<option value={item.id} key={index}>{item.value}</option>);
    });
    const handleChange = (event) => {
        // send value to parent element
        if (event && event.target) {
            onChange(event.target.value);
        }
    };
    return (
        <div className="form-group">
            <label htmlFor={elementID}>{label}</label>
            <select className="form-control" id={elementID} defaultValue={defaultSelected ? defaultSelected : array[0].id} onChange={handleChange}>
                {optionArr}
            </select>
        </div>
    );
}
SelectOptionCustom.propTypes = {
    array: PropTypes.array,
    label: PropTypes.string,
    elementID: PropTypes.any,
    onChange: PropTypes.func,
    defaultSelected: PropTypes.string
};
export default SelectOptionCustom;
