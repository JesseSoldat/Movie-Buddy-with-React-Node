import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col, Panel, Image, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import {renderIcon} from '../utils';
import {startGetDetails} from '../actions/moviedb';


export class MovieDetailsPage extends Component {
  componentDidMount() {
    this.props.startGetDetails(this.props.id);
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
    console.log(this.props.moviedb);
    
    const { movie } = this.props;
    const { title, poster_path, original_title, release_date, vote_average, genres, production_companies, overview, homepage } = movie;

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={10} smOffset={1}>
            <Panel className="card__panel">
              <Panel.Heading   className="card__panel__heading">
                {title}
              </Panel.Heading>
              <Panel.Body className="card__panel__body">
              {this.renderPoster(poster_path)}
              </Panel.Body>
              <Panel.Footer>
                <ButtonToolbar>
                  <ButtonGroup>
                    <Button bsStyle="primary">
                      Back
                    </Button>
                    <Button bsStyle="success">
                      {renderIcon('heart')}                
                      Favorite
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({moviedb}, ownProps) => ({
  id: ownProps.match.params.id,
  movie: moviedb.movie,
  moviedb: moviedb
});

const mapDispatchToProps = (dispatch) => ({
  startGetDetails: (id) => dispatch(startGetDetails(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);