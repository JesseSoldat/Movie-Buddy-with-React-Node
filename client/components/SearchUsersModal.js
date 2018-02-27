import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {toggleModal} from '../actions/modal';
import othersFavorites from '../selectors/othersFavorites';

class SearchUsersModal extends Component {
  toggleModal = (show) => {
    this.props.toggleModal(show);
  }

  renderListGroup = () => {
    const {othersFavorites} = this.props;
    const listGroupsArraySorted = [];    

    if(Object.keys(othersFavorites).length === 0 && othersFavorites.constructor === Object) {
      return;
    }
    
    for(let key in othersFavorites) {
      const id = othersFavorites[key].id;
      const user = othersFavorites[key].username;
      let amount = othersFavorites[key].movies.length;
      amount = amount + (amount === 1 ? ' other movie.' : ' other movies.');
      const matched = othersFavorites[key].matched;

      const matchedStr = (matched === 1) ? (` ${matched} movie with you.`) : (` ${matched} movies with you.`);

      listGroupsArraySorted.push({
        id,
        user,
        matched,
        matchedStr,
        amount
      });
    }
    
    let sorted = this.sortListGroupsArray(listGroupsArraySorted);
    console.log(sorted);

    return sorted.map(obj => (
      <ListGroup key={obj.id}>
        <ListGroupItem header={`${obj.user} has matched ${obj.matchedStr}`}>
          Check out {obj.user}'s {obj.amount}
        </ListGroupItem>
      </ListGroup>
    ));
  };

  sortListGroupsArray = (listGroupsArray) => {
    return listGroupsArray.sort(this.compare);
  }

  compare = (b, a) => {
    if (a.matched < b.matched)
      return -1;
    if (a.matched > b.matched)
      return 1;
    return 0;
  }

  render() {
    return (
      <Modal show={this.props.modal} 
        onHide={() => this.toggleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Search Other's Lists</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {this.renderListGroup()}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => this.toggleModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}

const mapStateToProps = ({modal, favorites}) => ({
  modal: modal.show,
  favorites: favorites.movies,
  othersFavorites: othersFavorites(favorites.others, favorites.movies)
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (toggle) => dispatch(toggleModal(toggle))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsersModal);