import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import DashboardPage from '../pages/DashboardPage';


export const history = createHistory();

const Welcome = () => (<h1>Welcome</h1>);


const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={Welcome} exact />
        <PublicRoute path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

