import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Col, FormGroup, FormControl } from 'react-bootstrap';
import {filterFavorites} from '../actions/favorites';

class FilterBox extends Component {
  state = {
    text: ''
  }

  onChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({text}));
    this.props.filterFavorites(text);
  }

  render() {
    return (
      <Form horizontal className="searchbox">
        <FormGroup controlId="searchText" validationState={null}>
          <Col sm={2}>
            <h2 className="searchBox__label">Filter</h2>{'   '}   
          </Col>
          <Col sm={10}>
            <FormControl type="text"
              value={this.state.text}
              onChange={this.onChange}/>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  filterFavorites: (text) => dispatch(filterFavorites(text))
});

export default connect(undefined, mapDispatchToProps)(FilterBox);
