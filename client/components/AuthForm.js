import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {startLogin, startRegister} from '../actions/auth';

class AuthForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameErrorMsg: null,
    emailErrorMsg: null,
    passwordErrorMsg: null
  }

  onUsernameChange = (e) => {
    const username = e.target.value;
    this.setState(() => ({username, usernameErrorMsg: null}));
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email, emailErrorMsg: null}));
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password, passwordErrorMsg: null}));
  }

  onSubmit = (e) => {
    e.preventDefault();
  
    if(this.state.password.length < 5) {
      this.setState(() => ({usernameErrorMsg: 'Please provide a username of at least 5 characters.'}));
    }

    if(!this.checkEmail()) {
      this.setState(() => ({emailErrorMsg: 'Please provide a proper email.'}));
    }
    if(this.state.password.length <= 5) {
      this.setState(() => ({passwordErrorMsg: 'Please provide a password of at least 6 characters.'}));
    }
    if(this.state.emailErrorMsg !== null || this.state.passwordErrorMsg !== null ) {
      return;
    } 

    if(this.props.formType === 'login') {
      this.props.startLogin(this.state.email, this.state.password);
    }
    
    if(this.props.formType === 'register') {
      if(this.state.usernameErrorMsg === null) {
        this.props.startRegister(this.state.username, this.state.email, this.state.password);
      } 
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

  getUserNameValidationState = () => {
    const length = this.state.username.length;
    if (length > 7) return 'success'; 
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';     
    return null;
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

  renderUserName = () => {
    if(this.props.formType === 'register') {
      return (
        <FormGroup controlId="username"
          validationState={this.getUserNameValidationState()}>
          <ControlLabel>Username</ControlLabel>
          <FormControl type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onUsernameChange}
          >
          </FormControl>
          <span className="authform__error">{this.state.usernameErrorMsg}</span>
        </FormGroup>
      );
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.renderUserName()}
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
  startRegister: (username, email, password) => dispatch(startRegister(username, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);