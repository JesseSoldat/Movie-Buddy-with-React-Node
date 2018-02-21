import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const Dashboard = () => (<div>Dashboard</div>);

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={Dashboard} exact />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

