import React from 'react';
import {IndexRoute, Redirect, Route, Router as ReactRouter} from 'react-router';

import Layout from './pages/layout';
import Landing from './pages/landing';
import User from './pages/user';

const Router = props => (
  <ReactRouter {...props}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Landing}/>
      <Route path="/user" component={User} />
      <Route path="/user/:slug" component={User} />
      <Redirect from="*" to="/"/>
    </Route>
  </ReactRouter>
);

export default Router;
