import React, {Component} from 'react';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

class LogoutPage extends Component {
  componentDidMount() {
    this.props.startLogout(this.props.token);
  }

  render() {
    return (<div></div>);
  }
}

const mapStateToProps = ({auth}) => ({
  token: auth.token
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);