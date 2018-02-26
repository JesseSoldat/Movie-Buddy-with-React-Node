import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Form, Col, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import {startGetOthersFavorites, filterFavorites} from '../actions/favorites';
import {toggleModal} from '../actions/modal';


class FilterBox extends Component {
  state = {
    text: ''
  }

  onChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({text}));
    this.props.filterFavorites(text);
  }

  toggleModal = () => {
    this.props.toggleModal(true);
    this.props.startGetOthersFavorites();   
  }

  render() {
    return (
      <Form horizontal className="searchbox">
        <FormGroup controlId="searchText" validationState={null}>
          <Col sm={2}>
            <h2 className="searchBox__label">Filter</h2>{'   '}   
          </Col>
          <Col sm={10}>
            <InputGroup>
              <FormControl type="text"
                value={this.state.text}
                onChange={this.onChange}/>
               <InputGroup.Button>
                <Button onClick={this.toggleModal}>
                  Other Users
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  filterFavorites: (text) => dispatch(filterFavorites(text)),
  toggleModal: (show) => dispatch(toggleModal(show)),
  startGetOthersFavorites: () => dispatch(startGetOthersFavorites())
});

export default connect(undefined, mapDispatchToProps)(FilterBox);
