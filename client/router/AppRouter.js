import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import LogoutPage from '../pages/LogoutPage';
import DashboardPage from '../pages/DashboardPage';
import SearchMoviesPage from '../pages/SearchMoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import FavoritesPage from '../pages/FavoritesPage';
import OtherUsersFavoritesPage from '../pages/OtherUsersFavoritesPage';

export const history = createHistory();

const Welcome = () => (<h1>Welcome</h1>);
const NotFoundPage = () => (<h1>Not Found</h1>);


const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={Welcome} exact />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/register" component={RegisterPage} />
        <PrivateRoute path="/logout" component={LogoutPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />

        <PrivateRoute path="/search" component={SearchMoviesPage} exact />
        <PrivateRoute path="/favorites" component={FavoritesPage} exact />
        <PrivateRoute path="/others_matches/:uid" component={OtherUsersFavoritesPage} exact />

        <PrivateRoute path="/search/details/:id" component={MovieDetailsPage} />
        <PrivateRoute path="/favorites/details/:id" component={MovieDetailsPage} />
        <PrivateRoute path="/others_matches/:uid/details/:id" component={MovieDetailsPage} />
       
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

