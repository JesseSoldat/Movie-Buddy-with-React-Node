import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import Card from '../components/Card';
import newMoviesSelector from '../selectors/newMovies';

class SearchMoviesPage extends Component {
  renderCards = () => {
    const from = this.props.route;
    return this.props.movies.map(movie => <Card key={movie.id} movie={movie} from={from} />);
  }

  render() {
    return (
      <span>
      <Grid>
        <Row>
          <Col xs={12} sm={10} smOffset={1} >
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

const mapStateToProps = ({moviedb, favorites}, ownProps) => ({
  movies: newMoviesSelector(moviedb.movies, favorites.movies),
  route: ownProps.match.path
});

export default connect(mapStateToProps)(SearchMoviesPage);