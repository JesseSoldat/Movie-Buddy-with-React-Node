import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Nav, NavItem, Navbar, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Menu extends Component {
  renderBrand = () => {
    if(this.props.isAuthenticated) {
      return (
        <LinkContainer to="/dashboard">
          <a href="/dashboard">Movie Buddy</a>
        </LinkContainer>
      );
    }

    return (
      <LinkContainer to="/">
        <a href="/">Movie Buddy</a>        
      </LinkContainer>
    );
  }

  renderRightSideLinks = () => {
    if(this.props.isAuthenticated) {
      return (
        <Nav pullRight>
          <LinkContainer to="/search">
            <NavItem eventKey={1}>Search</NavItem>
          </LinkContainer>
          <LinkContainer to="/logout">
            <NavItem eventKey={2}>Logout</NavItem>
          </LinkContainer>
        </Nav>
      );
    }
    return (
      <Nav pullRight>
        <Link to="/login" className="header__link">
          <NavItem eventKey={1}>Login</NavItem>
        </Link>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            {this.renderBrand()}
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            {this.renderRightSideLinks()} 
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = ({auth}) => ({
  isAuthenticated: !!auth._id
});

export default connect(mapStateToProps)(Menu);