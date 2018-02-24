import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Panel, Image, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import {history} from '../router/AppRouter';
import FontAwesome from 'react-fontawesome';
import {truncateText, renderIcon} from '../utils';
import {startAddFavorite} from '../actions/favorites';

class Card extends Component {
  onViewDetails = () => {
    const {parent, movie} = this.props;
   
    history.push({
      pathname: `${parent}/details/${movie.id}`,
      state: { parent }
    });
  }

  addToFavorites = () => {
    const {movie, startAddFavorite} = this.props;
    startAddFavorite(movie);
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
  )


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
            <ButtonToolbar>
              <ButtonGroup className="card_panel_buttons_large">
                <Button bsStyle="primary"
                  onClick={this.onViewDetails}                
                >
                  View
                </Button>
                <Button bsStyle="success">
                  {renderIcon('heart')}
                  Favorite
                </Button>
              </ButtonGroup>
              <ButtonGroup bsSize="small" className="card_panel_buttons_small">
                <Button bsStyle="primary"
                  onClick={this.onViewDetails}
                >
                  View
                </Button>
                <Button bsStyle="success"
                  onClick={this.addToFavorites}>
                  {renderIcon('heart')}                
                  Favorite
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
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
  startAddFavorite: (movie) => dispatch(startAddFavorite(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
