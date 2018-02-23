import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Well, Grid, Row, Col} from 'react-bootstrap';


export class MovieDetailsPage extends Component {
  render() {
    return (
      <Grid>
        <Row xs={12} sm={10} smOffset={1}>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({}, ownProps) => ({
  id: ownProps.match.params.id
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsPage);