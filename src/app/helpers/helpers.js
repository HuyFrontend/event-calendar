const sortArrayByKey = (array, key) => {
    return array.sort( (a, b) => {
        const x = parseInt(a[key]);
        const y = parseInt(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};
const weekDayLabel = (dateIndex) => {
    const weekDayType0 = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDayType0[dateIndex%7];
};
const timeUnitArr = (maxValue) => {
    const optionArr = [];
    for(let i = 0; i <= maxValue; i++) {
        let value = i;
        if (i < 10) {
            value = `0${i}`;
        } else {
            value = value.toString();
        }
        optionArr.push({ id: value, value: value});
    }
    return optionArr;
}
export {
    sortArrayByKey,
    weekDayLabel,
    timeUnitArr
};