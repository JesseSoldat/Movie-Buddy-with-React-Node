import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col, Panel, Image, ButtonToolbar, ButtonGroup, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {history} from '../router/AppRouter';
import {renderIcon} from '../utils';
import {startGetFavorites} from '../actions/favorites';
import Card from '../components/Card';
import LoadingPage from './LoadingPage';
import FilterBox from '../components/FilterBox';
import filterFavorites from '../selectors/filterFavorites';

class FavoritesPage extends Component {
  componentDidMount() {
    this.props.startGetFavorites();
  }

  renderCards = () => {
    const from = this.props.route;
    
    return this.props.movies.map(movie => <Card key={movie.movieid} movie={movie} from={from} />).reverse();
  }

  render() {  
    if(this.props.loading) { return <LoadingPage />}

    return (
      <span>
      <Grid>
        <Row>
          <Col xs={12} sm={10} smOffset={1} >
            <FilterBox />
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

const mapStateToProps = ({loading, favorites}, ownProps) => ({
  loading,
  movies: filterFavorites(favorites.filter, favorites.movies),
  route: ownProps.match.path
})

const mapDispatchToProps = (dispatch) => ({
  startGetFavorites: () => dispatch(startGetFavorites()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);