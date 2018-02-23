import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Panel, Image, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import {history} from '../router/AppRouter';

class Card extends Component {
  onViewDetails = () => {
    history.push({
      pathname: `details/${this.props.movie.id}`
    });
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
            {title}
          </Panel.Heading>
          <Panel.Body className="card__panel__body">
           {this.renderPoster(poster_path)}
          </Panel.Body>
          <Panel.Footer>
            <ButtonToolbar>
              <ButtonGroup className="card_panel_buttons_large">
                <Button bsStyle="primary">Left</Button>
                <Button bsStyle="success">Right</Button>
              </ButtonGroup>
              <ButtonGroup bsSize="small" className="card_panel_buttons_small">
                <Button bsStyle="primary">Left</Button>
                <Button bsStyle="success">Right</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Panel.Footer>
        </Panel>
      </Col>
    );
  }
}

const mapStateToProps = (state, {movie}) => ({
  movie
});

export default connect(mapStateToProps)(Card);
