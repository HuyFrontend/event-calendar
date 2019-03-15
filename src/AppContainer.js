import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import './AppContainer.scss';
import { history } from './app/constants';
import { connect } from 'react-redux';
import routes from './app/routes/routes';
class AppContainer extends Component {
    constructor() {
		super();
	}
	get routes() {
		return routes;
	}
	render() {
		return (
			<div className="AppContainer">
				<div className="page-content">
					<div className="container">
						<Switch history={history} location={location}>
							{ this.routes.map((route, idx) => {
								if (route.component) {
									return (
										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											name={route.name}
											render={(props) => (<route.component {...props}/>)}
										/>
									)
								} else {
									return null;
								}
							})}
							<Redirect from="/" to="/event-calendar" />
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
    return {
		state,
        ...ownProps
    }
};
export default withRouter(connect(mapStateToProps)(AppContainer));