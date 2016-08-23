import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextBox from '../components/TextBox';
import Webcam from './Webcam';
import Chart from './Chart';
import Cloud from './Cloud';

class Practice extends Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      sessionTimestamp: Date.now()
    };
  }

  componentDidMount() {
    this.props.socket.emit('sessionStart', {
      sessionTimestamp: this.state.sessionTimestamp,
      username: this.context.user.username
    });
  }

  handleTextChange (event) {
    event.target.value;
  }

  render () {
    return (
    <div className="container">
      <h1> Practice </h1>
      <div className="row">
        <Webcam
          sessionTimestamp={this.state.sessionTimestamp}
          user={this.context.user}
        />
        <TextBox
          speechToText={this.props.speechToText}
          sessionTimestamp={this.state.sessionTimestamp}
          user={this.context.user}
        />
      </div>
      <div className="row">
        <Chart emotion={this.props.msEmotion}/>
      </div>
      <div className="row">
        <Cloud trans={this.props.transcription}/>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    speechToText: state.speechToText,
    msEmotion: state.msEmotion,
    transcription: state.transcription
  };
}

export default connect(mapStateToProps)(Practice);
