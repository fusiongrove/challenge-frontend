import React from 'react';
import { IndexRoute, Router as ReactRouter, Route, browserHistory, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store/index';
import Layout from './layout';

import ListUsers from './containers/users/list_users';

const routes = (
    <ConnectedRouter history={history}>
        <Layout>
            <Switch>
                <Route exact path="/users" component={ListUsers} />
            </Switch>
        </Layout>
    </ConnectedRouter>
);

export default routes;
