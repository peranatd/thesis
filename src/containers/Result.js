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
  }

  render(){
    return(
      <div classname="Result">
        <h3>Sentiment Result</h3>
        {
          this.props.msEmotion.length ? <Chart emotion={this.props.msEmotion}/> : <p>Sorry you don't have any sentiment result yet. Please go to practice page practicing first. Thank you!</p>
        }
        <h3>Speech Word Cloud</h3>
        {
          this.props.transcription.length ? <Cloud trans={this.props.transcription}/> : <p>Sorry you don't have any word cloud yet. Please go to practice page adding text in the textbox first. Thank you!</p>
        }
        <h3>Speech Content Sentiment Result</h3>
        {
          Object.keys(this.props.watsonSentiment).length ? <Radar watson={this.props.watsonSentiment}/> : <p>Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!</p>
        }
        <h3>Speech Tone Sentiment Result</h3>
        {
          this.props.tone.length ? <Tone_Cloud tone={this.props.tone}/> : <p>Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!</p>
        }

        {
          this.props.tone.length ? <AttitudeResult tone={this.props.tone}/> : null
        }

        {
          this.props.tone.length ? <ToneSummary tone={this.props.tone}/> : null
        }
      </div>
    )
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
