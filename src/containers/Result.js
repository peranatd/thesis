import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './Chart';
import Cloud from './Cloud';
import Tone_Cloud from './Tone_Cloud';
import Radar from './Radar';
import ToneSummary from './ToneSummary';
import AttitudeResult from './AttitudeResult';

class Result extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentWillReceiveProps(newprops){
    let test = JSON.parse(newprops.tone)[0].result
    this.setState({
      result: {
        toneRes: test,
        emotionRes: newprops.msEmotion,
        transRes: newprops.transcription.length,
        watsonRes: newprops.watsonSentiment.document_tone
      }
    })
  }
  render(){
    if(this.state.result){
      return(
        <div classname="Result">
          <h3>Sentiment Result</h3>
          <Chart />
          <Cloud />
          <Radar />
          <Tone_Cloud />
          <AttitudeResult />
          <ToneSummary />
        </div>
      );
    }else{
      return(
        <div>
          <p>Sorry you don't have any result yet. Please go to practice page practice first. Thank you!</p>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    msEmotion: state.msEmotion,
    tone: state.tone,
    transcription: state.transcription,
    watsonSentiment: state.watsonSentiment
  };
}

export default connect(mapStateToProps)(Result);
