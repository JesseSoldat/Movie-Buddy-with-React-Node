import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {startLogin, startRegister} from '../actions/auth';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
    emailErrorMsg: '',
    passwordErrorMsg: ''
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.checkEmail()) {
      this.setState(() => ({emailErrorMsg: 'Please provide a proper email.'}));
    }
    if(this.state.password.length < 5) {
      this.setState(() => ({passwordErrorMsg: 'Please provide a password of at least 6 characters.'}));
    }
    if(this.state.emailError || this.state.passwordError) {
      return;
    }

    if(this.props.formType === 'login') {
      this.props.startLogin(this.state.email, this.state.password);
    }
    
    if(this.props.formType === 'register') {
      this.props.startRegister(this.state.email, this.state.password);
    }

  }

  checkEmail = () => {
    const regex = 	
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = null;
    let email = this.state.email;

    if(email.length >= 1) {
      valid = regex.test(this.state.email);
    } 
    else { valid = null;}
    return valid;
  }

  getEmailValidationState = () => {
    const valid = this.checkEmail();
    if (valid) return 'success';
    else if (valid === false) return 'error';
    else if (valid === null) return null;   
  }

  getPasswordValidationState = () => {
    const length = this.state.password.length;
    if (length > 10) return 'success'; 
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';     
    return null;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup controlId="email"
          validationState={this.getEmailValidationState()}>
          <ControlLabel>Email</ControlLabel>
          <FormControl type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
          >
          </FormControl>
          <span className="authform__error">{this.state.emailErrorMsg}</span>
        </FormGroup>
        <FormGroup controlId="password"
           validationState={this.getPasswordValidationState()}>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          >
          </FormControl>
          <span className="authform__error">{this.state.passwordErrorMsg}</span>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  formType: ownProps.formType
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: (email, password) => dispatch(startLogin(email, password)),
  startRegister: (email, password) => dispatch(startRegister(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);