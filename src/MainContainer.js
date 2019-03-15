import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './app/stores/configStore';
import { history } from './app/constants';
import AppContainer from './AppContainer';
const store = configureStore();
class MainContainer extends Component {
	constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`MainContainer`}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <AppContainer/>
                    </ConnectedRouter>
                </Provider>
            </div>
        );
    }
}
export default MainContainer;
