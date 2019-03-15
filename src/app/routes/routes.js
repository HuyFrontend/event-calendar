import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
    return <div>Loading...</div>;
}


const EventCalendarComponent = Loadable({
    loader: () => import('./../components/Month'),
    loading: Loading
});

const routes = [
    { path: '/', exact: true, name: 'Home', component: EventCalendarComponent },
    { path: '/event-calendar', name: 'Event Calendar', component: EventCalendarComponent }
];

export default routes;