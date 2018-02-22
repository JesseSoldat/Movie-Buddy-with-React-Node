import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col} from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import Card from '../components/Card';

class SearchMoviesPage extends Component {
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
            <Card />        
          </Col>
        </Row>
      </Grid>
      </span>
     
    );
  }
}

export default connect(undefined)(SearchMoviesPage);