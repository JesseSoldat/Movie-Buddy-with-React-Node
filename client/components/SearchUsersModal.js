import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
import {toggleModal} from '../actions/modal';

class SearchUsersModal extends Component {
  toggleModal = (show) => {
    this.props.toggleModal(show);
  }

  render() {
    return (
      <Modal show={this.props.modal} 
        onHide={() => this.toggleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Search Other's Lists</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.toggleModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}

const mapStateToProps = ({modal}) => ({
  modal: modal.show
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (toggle) => dispatch(toggleModal(toggle))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsersModal);