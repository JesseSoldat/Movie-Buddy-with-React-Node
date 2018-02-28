import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import Card from '../components/Card';
import LoadingPage from './LoadingPage';
import FilterBox from '../components/FilterBox';
import {getOtherUserFavorites} from '../actions/favorites';

class OtherUsersFavoritesPage extends Component {

  renderCards = () => {
    const {matchedUser} = this.props;
  
    if(matchedUser && matchedUser.movies) {
      return matchedUser.movies.map(movie => 
        <Card key={movie.movieid} 
          movie={movie} 
          matchedUser={matchedUser}
          from={`/others_matches/${matchedUser.id}`}
        />).reverse();
    }
    return null;    
  }


  render() {  
    if(this.props.loading) { return <LoadingPage />}
    const {matchedUser: {user}} = this.props;

    return (
      <span>
      <Grid>
        <Row>
          <Col xs={12} sm={10} smOffset={1} className="otherUsers__title">
            <h3 className="text-center">Here are {user}'s movies that you have not favorited yet</h3>
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

const mapStateToProps = ({favorites}) => ({
  matchedUser: favorites.matchedUser
});

const mapDispatchToProps = (dispatch) => ({
  getOtherUserFavorites: () => dispatch(getOtherUserFavorites())
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherUsersFavoritesPage);