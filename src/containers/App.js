import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../App.css';
import Navbar from '../components/Navbar';

class App extends Component {
  render() {

    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <div className="App">
        <Navbar
        isAuthenticated={ isAuthenticated }
        errorMessage={ errorMessage }
        dispatch={ dispatch }
        />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, errorMessage } = state.auth;

  return {
    isAuthenticated: isAuthenticated,
    errorMessage: errorMessage
  };
}

export default connect(mapStateToProps)(App);
