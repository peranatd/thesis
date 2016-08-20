import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextBox from '../components/TextBox';
import Webcam from './Webcam';
import Chart from './Chart';
import Cloud from './Cloud';

class Practice extends Component {
  constructor(props) {
    super(props);
  }

  handleTextChange (event) {
    event.target.value;
  }

  render () {
    return (
    <div className="container">
      <h1> Practice </h1>
      <div className="row">
        <Webcam />
        <TextBox speechToText={this.props.speechToText}/>
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
