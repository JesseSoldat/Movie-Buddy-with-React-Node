import React, {Component} from 'react';
import {connect} from 'react-redux';
import { FormGroup, FormControl } from 'react-bootstrap';
import {startMoviesSearch} from '../actions/moviedb';

class SearchBox extends Component {
  state = {
    text: ''
  }

  onChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({text}));
    this.props.startMoviesSearch(text);
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

const mapDispatchToProps = (dispatch) => ({
  startMoviesSearch: (term) => dispatch(startMoviesSearch(term))
});

export default connect(undefined, mapDispatchToProps)(SearchBox);
