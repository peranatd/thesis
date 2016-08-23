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
      <div className="container">
        <div className="Result">
          <h3 className="resultSection">Sentiment Result</h3>
          {
            this.props.msEmotion.length ? <Chart emotion={this.props.msEmotion}/> : <p>{"Sorry you don't have any sentiment result yet. Please go to practice page practicing first. Thank you!"}</p>
          }
        </div>

        <div className="Result">
          <h3 className="resultSection">Speech Word Cloud</h3>
          {
            this.props.transcription.length ? <Cloud trans={this.props.transcription}/> : <p>{"Sorry you don't have any word cloud yet. Please go to practice page adding text in the textbox first. Thank you!"}</p>
          }
        </div>

        <div className="Result">
          <h3 className="resultSection">Speech Content Sentiment Result</h3>
          {
            Object.keys(this.props.watsonSentiment).length ? <Radar watson={this.props.watsonSentiment}/> : <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
          }
        </div>

        <div className="Result">
          <h3 className="resultSection">Speech Tone Sentiment Result</h3>
          <div className="row">
            <div className="col-md-3">
              <h4 className="toneTitle">Tone Cloud</h4>
              {
                this.props.tone.length ? <Tone_Cloud tone={this.props.tone}/> : <p>{"Sorry you don't have any sentiment result yet. Please go to practice page recording first. Thank you!"}</p>
              }
            </div>
            <div className="col-md-6">
              <h4 className="toneTitle">Attitude Result</h4>
              {
                this.props.tone.length ? <AttitudeResult tone={this.props.tone}/> : null
              }
            </div>
            <div className="col-md-3">
              <h4 className="toneTitle">Tone Summary</h4>
              {
                this.props.tone.length ? <ToneSummary tone={this.props.tone}/> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
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
