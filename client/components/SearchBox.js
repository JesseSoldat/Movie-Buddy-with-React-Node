import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';

class SearchBox extends Component {
  state = {
    text: ''
  }

  onChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({text}));
  }

  render() {
    return (
      <FormGroup controlId="searchText" validationState={null}>
        <FormControl type="text"
        value={this.state.text}
        onChange={this.onChange}
        />
      </FormGroup>
    );
  }
}

export default connect(undefined)(SearchBox);
