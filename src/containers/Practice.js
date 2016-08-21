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
      sessionId: Date.now()
    };
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
          sessionId={this.state.sessionId}
          user={this.context.user}
        />
        <TextBox
          speechToText={this.props.speechToText}
          sessionId={this.state.sessionId}
          user={this.context.user}
        />
      </div>
      <div className="row">
        <Chart emotion={this.props.msEmotion}/>
        <Cloud trans={this.props.transcription}/>
        <div className="col-md-2">
          <Link to="/result" className="btn btn-lg btn-primary" role="button">See Result</Link>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    speechToText: state.speechToText,
    msEmotion: state.msEmotion,
    transcription: state.transcription
  };
}

export default connect(mapStateToProps)(Practice);
