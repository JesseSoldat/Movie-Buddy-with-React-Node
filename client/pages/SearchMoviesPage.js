import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import Card from '../components/Card';

class SearchMoviesPage extends Component {
  renderCards = () => {
    return this.props.movies.map(movie => <Card key={movie.id} movie={movie} />)
  }

  render() {
    return (
      <span>
      <Grid>
        <Row>
          <Col xs={12} sm={8} smOffset={2}>
            <h2>Search</h2>
            <SearchBox />
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            {this.renderCards()}        
          </Col>
        </Row>
      </Grid>
      </span>
     
    );
  }
}

const mapStateToProps = ({moviedb}) => ({
  movies: moviedb.movies
})

export default connect(mapStateToProps)(SearchMoviesPage);