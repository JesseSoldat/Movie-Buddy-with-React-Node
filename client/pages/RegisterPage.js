import React from 'react';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import AuthForm from '../components/AuthForm';

const RegisterPage = () => (
  <Grid>
    <Well className="auth__well">
      <Row>
        <Col xs={12} sm={6} smOffset={3}>
          <h2 className="auth__title">Register</h2>
          <AuthForm formType="register"/>
        </Col>
      </Row>
    </Well>
  </Grid>
);

export default RegisterPage;