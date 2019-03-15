import createHistory from 'history/createBrowserHistory';
export const history = createHistory();
export const isProduction = (process.env.NODE_ENV !== 'production') ? false : true;
export const eventStatusArr = [
    {id: 1, value: 'Solo'},
    {id: 2, value: 'Team'},
    {id: 3, value: 'Company'},
];

export const testEventList = [
	{ title: 'Report', id: '2019-03-20-00-03', date: '2019-03-20', status: '1', hour: '04', min:'03' },
	{ title: 'Meeting', id: '2019-03-20-00-11', date: '2019-03-20', status: '2', hour: '15', min:'03' },
    { title: 'Playing', id: '2019-03-22-00-03', date: '2019-03-22', status: '2', hour: '20', min:'10' },
    { title: 'Testing Today', id: '2019-03-23-02-09', date: '2019-03-15', status: '1', hour: '13', min:'15' },
    { title: 'Go Genting', id: '2019-03-23-00-03', date: '2019-03-15', status: '2', hour: '22', min:'50' },
    { title: 'Airport', id: '2019-03-23-00-03', date: '2019-03-30', status: '1', hour: '22', min:'50' }
];
export const eventActions = {
    addEvent: 'Add',
    modifyEvent: 'Modify'
};
const CONSTANT = {

};
export default CONSTANT;