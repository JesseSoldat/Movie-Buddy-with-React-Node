import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col, Panel, Image, ButtonToolbar, ButtonGroup, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {history} from '../router/AppRouter';
import {renderIcon} from '../utils';
import {startGetDetails} from '../actions/moviedb';
import LoadingPage from './LoadingPage';

export class MovieDetailsPage extends Component {
  componentDidMount() {
    this.props.startGetDetails(this.props.id);
  }

  goBack = () => {
    const str = this.props.parent;
    if(str.indexOf('search') !== -1) {
      history.push(`/search`);   
    } else {
      history.push(`/favorites`);
    }
  }

  renderPoster = (poster_path) => (
    poster_path ? (
      <Image className="detail__image"
        src={`http://image.tmdb.org/t/p/w500/${poster_path}`} 
        thumbnail />
    ) : (
      <Image className="detail__image"
        src="/images/noFilm.png"  
        thumbnail />
    )
  );

  renderListItem = (string, prop) => (
    prop ? ( 
      <ListGroupItem>
        <strong>{string}</strong>
        <br/>
        {prop}
      </ListGroupItem>
    ) : ''
  );

  renderListArrayItems = (string, array = []) => {
    if(array.length === 0) {return;}

    const elementsMap = array.map((e, i) => 
        (array.length === i + 1) 
        ? (<span key={e.id}>{e.name}</span>)
        : (<span key={e.id}>{e.name}, </span>)  
    );
    return (this.renderListItem(string, elementsMap));
  }

  renderListLinkItem = (string, prop) => (
    prop ? (
      <ListGroupItem>
        <strong>{string}</strong>
        <br/>
        <a href={prop} target="_blank">
          {prop}
        </a>
      </ListGroupItem>
    ) : ''
  );

  renderButtonGroup = () => {
    const str = this.props.parent;
    if(str.indexOf('search') !== -1) {
      return (
        <ButtonGroup className="detail__panel__button">
          <Button className="detail__panel__button"
            onClick={this.goBack}
            bsStyle="primary">
            Back
          </Button>
          <Button className="detail__panel__button"
            bsStyle="success">
            {renderIcon('heart')}                
            Favorite
          </Button>
        </ButtonGroup>
      );
    } 
    else {
      return (
        <ButtonGroup className="detail__panel__button">
        <Button className="detail__panel__button"
          onClick={this.goBack}
          bsStyle="primary">
          Back
        </Button>
        <Button className="detail__panel__button"
          bsStyle="danger">
          {renderIcon('trash')}                
          Delete
        </Button>
      </ButtonGroup>
      );
    }
  }

  render() {
    if(this.props.loading) {
      return <LoadingPage />
    }
    console.log(this.props.movie);
    
    const { movie } = this.props;
    const { title, poster_path, original_title, release_date, vote_average, genres, production_companies, overview, homepage } = movie;

    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Panel className="detail__panel">
              <Panel.Heading   className="detail__panel__heading">
                {title}
              </Panel.Heading>
              <Panel.Body className="detail__panel__body">
                <Col xs={6}>
                  {this.renderPoster(poster_path)}
                </Col>
                <Col xs={6}>
                  <ListGroup>
                      {this.renderListItem('Original Title: ', original_title)}
                      {this.renderListItem('Release Date: ', release_date)}
                      {this.renderListItem('Rating: ', vote_average)}
                      {this.renderListArrayItems('Genres: ', genres)}
                      {this.renderListArrayItems('Production Company:  ', production_companies)}  
                      {this.renderListItem('Description: ', overview)}
                      {this.renderListLinkItem('Home Page: ', homepage)}
                  </ListGroup>
                </Col>
              </Panel.Body>
              <Panel.Footer>
                <ButtonToolbar>
                 {this.renderButtonGroup()}
                </ButtonToolbar>
              </Panel.Footer>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({loading, moviedb}, ownProps) => ({
  loading,
  id: ownProps.match.params.id,
  parent: ownProps.match.url,
  movie: moviedb.movie,
});

const mapDispatchToProps = (dispatch) => ({
  startGetDetails: (id) => dispatch(startGetDetails(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);