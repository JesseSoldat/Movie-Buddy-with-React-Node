import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Col, FormGroup, FormControl } from 'react-bootstrap';
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
      <Form horizontal className="searchbox">
        <FormGroup controlId="searchText" validationState={null}>
          <Col sm={2}>
            <h2 className="searchBox__label">Search</h2>{'   '}      
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
  startMoviesSearch: (term) => dispatch(startMoviesSearch(term))
});

export default connect(undefined, mapDispatchToProps)(SearchBox);
