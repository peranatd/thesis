import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './Chart';

class Result extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div classname="Result">
        <h3>Sentiment Result</h3>
        <Chart />
        <ul>
          {this.props.sentiment.map((emotion) => {
            return (
              <li>
                <span>
                  <img src="http://www.pic4ever.com/images/145fs78038.gif" border="0" />
                  Anger : {(emotion.scores.anger).toFixed(4)}
                </span>
                <span> Contempt : {(emotion.scores.contempt).toFixed(4)} </span>
                <span> Disgust : {(emotion.scores.disgust).toFixed(4)} </span>
                <span> Fear : {(emotion.scores.fear).toFixed(4)} </span>
                <span>
                  <img src="http://www.pic4ever.com/images/Banane21.gif" border="0" />
                  Happiness : {(emotion.scores.happiness).toFixed(4)}
                </span>
                <span> Neutral : {(emotion.scores.neutral).toFixed(4)} </span>
                <span> Sadness : {(emotion.scores.sadness).toFixed(4)} </span>
                <span> Surprise : {(emotion.scores.surprise).toFixed(4)} </span>
              </li>
            );
          })
        }
        </ul>
        <h3>Tone Result</h3>
        {this.props.tone}

        <h3>Speech to Text</h3>
        {JSON.stringify(this.props.speechToText)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sentiment: state.sentiments,
    tone: state.tone,
    speechToText: state.speechToText
  };
}

export default connect(mapStateToProps)(Result);
