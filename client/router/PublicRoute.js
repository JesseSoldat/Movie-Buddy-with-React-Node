import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Menu from '../components/Menu';

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <Menu />
        <Component {...props} />
      </div>
    )
  )}
  />
);

const mapStateToProps = ({auth}) => ({
  isAuthenticated: !!auth._id
});

export default connect(mapStateToProps)(PublicRoute);