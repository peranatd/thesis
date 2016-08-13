import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socketAction } from '../actions/action_socket';

import io from 'socket.io-client';

import '../App.css';
import Navbar from '../components/Navbar';

class App extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const socket = io();
    console.log(socket);
    this.props.socketAction(socket)
  }

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
        {console.log(this.props.socket)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isAuthenticated, errorMessage } = state.auth;

  return {
    isAuthenticated: isAuthenticated,
    errorMessage: errorMessage,
    socket: state.socket
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socketAction: socketAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
