import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Panel, Image, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import {history} from '../router/AppRouter';
import FontAwesome from 'react-fontawesome';
import {truncateText, renderIcon} from '../utils';
import {startAddFavorite, startDeleteFavorite} from '../actions/favorites';
import {startRemoveFromSearch} from '../actions/moviedb';

class Card extends Component {
  onViewDetails = () => {
    const {parent, movie} = this.props;
    const id = movie.id || movie.movieid;
   
    history.push({
      pathname: `${parent}/details/${id}`,
      state: { parent }
    });
  }

  addToFavorites = () => {
    const {movie, startAddFavorite, startRemoveFromSearch} = this.props;
    startAddFavorite(movie);
    startRemoveFromSearch(movie.id);
  }

  deleteFromFavorites = () => {
    const {startDeleteFavorite, movie} = this.props;
    startDeleteFavorite(movie._id);
  }

  renderPoster = (poster_path) => (
    poster_path ? (
      <Image className="card__image"
        src={`http://image.tmdb.org/t/p/w500/${poster_path}`} 
        thumbnail />
    ) : (
      <Image className="card__image"
        src="/images/noFilm.png"  
        thumbnail />
    )
  );

  renderButtonGroup = () => {
    const {parent} = this.props;
    if(parent.indexOf('search') !== -1) {
       return (
        <ButtonToolbar>
          <ButtonGroup className="card_panel_buttons_large">
            <Button bsStyle="primary"
              onClick={this.onViewDetails}>
              View
            </Button>
            <Button bsStyle="success"
              onClick={this.addToFavorites}>
              {renderIcon('heart')}
              Favorite
            </Button>
          </ButtonGroup>
          <ButtonGroup bsSize="small" className="card_panel_buttons_small">
            <Button bsStyle="primary"
              onClick={this.onViewDetails}>
              View
            </Button>
            <Button bsStyle="success"
              onClick={this.addToFavorites}>
              {renderIcon('heart')}                
              Favorite
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
       );
    } else {
      return (
        <ButtonToolbar>
        <ButtonGroup className="card_panel_buttons_large">
          <Button bsStyle="primary"
            onClick={this.onViewDetails}>
            View
          </Button>
          <Button bsStyle="danger"
            onClick={this.deleteFromFavorites}>
            {renderIcon('trash')}
            Delete
          </Button>
        </ButtonGroup>
        <ButtonGroup bsSize="small" className="card_panel_buttons_small">
          <Button bsStyle="primary"
            onClick={this.onViewDetails}>
            View
          </Button>
          <Button bsStyle="danger"
             onClick={this.deleteFromFavorites}>
            {renderIcon('trash')}              
            Delete
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      );
    }
  }


  render() {
    const {title, poster_path, id} = this.props.movie;
    return (
      <Col className="card" 
        key={id} xs={12} sm={4} md={3} smOffset={0}>
        <Panel className="card__panel">
          <Panel.Heading      className="card__panel__heading">
            {truncateText(title, 21)}
          </Panel.Heading>
          <Panel.Body className="card__panel__body">
           {this.renderPoster(poster_path)}
          </Panel.Body>
          <Panel.Footer>
            {this.renderButtonGroup()}
          </Panel.Footer>
        </Panel>
      </Col>
    );
  }
}

const mapStateToProps = (state, {movie, from}) => ({
  movie,
  parent: from
});

const mapDispatchToProps = (dispatch) => ({
  startAddFavorite: (movie) => dispatch(startAddFavorite(movie)),
  startRemoveFromSearch: (id) => dispatch(startRemoveFromSearch(id)),
  startDeleteFavorite: (id) => dispatch(startDeleteFavorite(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
