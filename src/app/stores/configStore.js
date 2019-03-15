import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {  routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './allReducers';
import { history, isProduction } from '../constants';

const loggerMiddleware = createLogger();
const historyMiddleware = routerMiddleware(history);
const configureStore = (preloadedState) => {
	// mode development
	if (!isProduction) {
		return createStore(
			rootReducer, preloadedState, composeWithDevTools(
				applyMiddleware(thunkMiddleware,
					loggerMiddleware,
					historyMiddleware
				)
			)
		)
	} else {
		// mode production
		return createStore(
			rootReducer, preloadedState, composeWithDevTools(
				applyMiddleware(thunkMiddleware,
					historyMiddleware
				)
			)
		)
	}
};
export default configureStore;