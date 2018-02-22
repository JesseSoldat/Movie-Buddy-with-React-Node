import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Col, Panel, Image} from 'react-bootstrap';

class Card extends Component {
  renderCard = ({title, poster_path, id}) => {
    return (
      <Col key={id} xs={10} sm={4} md={3} xsOffset={1} smOffset={0}>
        <Panel className="search__panel">
          <Panel.Heading      className="search__panel__heading">
            {title}
          </Panel.Heading>
          <Panel.Body className="search__panel__body">
            <Image className="search__image"
              src={`http://image.tmdb.org/t/p/w500/${poster_path}`} 
              thumbnail />
          </Panel.Body>
        </Panel>
      </Col>
    );
  }
  render() {
    return (
      <span>
        {this.props.movies.map((movie) => this.renderCard(movie))}
      </span>
    )
  }
}

const mapStateToProps = ({moviedb}) => ({
  movies: moviedb.movies
});

export default connect(mapStateToProps)(Card);