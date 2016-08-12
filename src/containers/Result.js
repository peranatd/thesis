import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div classname="Result">
        <h3>Sentiment Result</h3>
        <ul>
          {this.props.sentiment.map((emotion) => {
            emotion = JSON.parse(emotion);
            return (
              <li>
                <span>
                  <img src="http://www.pic4ever.com/images/145fs78038.gif" border="0" />
                  Anger : {(emotion[0].scores.anger).toFixed(4)}
                </span>
                <span> Contempt : {(emotion[0].scores.contempt).toFixed(4)} </span>
                <span> Disgust : {(emotion[0].scores.disgust).toFixed(4)} </span>
                <span> Fear : {(emotion[0].scores.fear).toFixed(4)} </span>
                <span>
                  <img src="http://www.pic4ever.com/images/Banane21.gif" border="0" />
                  Happiness : {(emotion[0].scores.happiness).toFixed(4)}
                </span>
                <span> Neutral : {(emotion[0].scores.neutral).toFixed(4)} </span>
                <span> Sadness : {(emotion[0].scores.sadness).toFixed(4)} </span>
                <span> Surprise : {(emotion[0].scores.surprise).toFixed(4)} </span>
              </li>
            );
          })
        }
        </ul>
        <h3>Tone Result</h3>
        {this.props.tone}

        <h3>Speech to Text</h3>
        {this.props.speechtotext}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sentiment: state.sentiments,
    tone: state.tone,
    speechtotext: state.speechtotext
  };
}

export default connect(mapStateToProps)(Result);
