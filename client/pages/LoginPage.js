import React from 'react';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import AuthForm from '../components/AuthForm';

const LoginPage = () => (
  <Grid>
    <Well className="login__well">
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <h2 className="login__title">Login</h2>
          <AuthForm formType="login"/>
        </Col>
      </Row>
    </Well>
  </Grid>
);

export default LoginPage;