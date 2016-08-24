import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { socketAction } from '../actions/action_socket';
import { msEmotionResponse } from '../actions/action_msEmotion';
import { StreamingSttResponse } from '../actions/action_streamingstt.js';
import { ToneResponse } from '../actions/action_tone';
import { getAllSessions } from '../actions/action_getAllSessions';
import { getAllResults } from '../actions/action_getAllResults';

import io from 'socket.io-client';

import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const initialResult = {
  msEmotion: undefined,
  transcript: undefined,
  bv: undefined,
  watson: undefined
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = io();

    socket.on('emotion', (response) => {
      let data = JSON.parse(response.response);
      if (data.length) {
        this.props.msEmotionResponse(data, this.props.msEmotion);
      }
    });
    socket.on('bv', (response) => {
      this.props.ToneResponse(response, this.props.tone);
    });
    socket.on('streamingSpeechToText',
      (data) => this.props.StreamingSttResponse(data, this.props.streamingStt)
    );
    socket.on('allSessions', (data) => {
      this.props.getAllSessions(data);
    });

    socket.on('allResults', (data) => {
      this.props.getAllResults(data, initialResult);
    });

    this.props.socketAction(socket);
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    msEmotion: state.msEmotion,
    tone: state.tone,
    streamingStt: state.streamingStt
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socketAction: socketAction,
    msEmotionResponse: msEmotionResponse,
    ToneResponse: ToneResponse,
    StreamingSttResponse: StreamingSttResponse,
    getAllSessions: getAllSessions,
    getAllResults: getAllResults
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
