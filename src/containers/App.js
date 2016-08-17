import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socketAction } from '../actions/action_socket';

import io from 'socket.io-client';

import '../App.css';
import Header from '../components/Header';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const socket = io();
    console.log(socket);
    this.props.socketAction(socket);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        {this.props.children}
        {console.log(this.props.socket)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socketAction: socketAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
