import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Map } from '../view';
import actions from '../../actions';

class MapNavigation extends Component {
  setNewLocation(location) {
    this.props.updateCurrentLocation(location);
  }

  render() {
    return (
      <div>
        <div style={{ height: '100vh' }}>
          <Map
            zoom={14}
            center={this.props.posts.currentLocation}
            mapMoved={this.setNewLocation.bind(this)}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    posts: state.post
  };
};

const dispatchToProps = dispatch => {
  return {
    updateCurrentLocation: location =>
      dispatch(actions.updateCurrentLocation(location))
  };
};

export default connect(stateToProps, dispatchToProps)(MapNavigation);
