// credit : http://bl.ocks.org/nbremer/6506614
import React, { Component } from 'react';
import { connect } from 'react-redux';

class EmotionTone extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps (newProps) {
    console.log('test', newProps.watsonSentiment)
    let emotionTone;
    let result = newProps.watsonSentiment.document_tone.tone_categories;
    console.log('apple',result)
    result.forEach(function(tone){
      console.log('pear',tone);
      if(tone.category_id === 'emotion_tone'){
        emotionTone = tone.tones;
      }
    })
    console.log('banana',emotionTone);
    let data = [];
    emotionTone.forEach(function(emotion){
      data.push({axis:emotion.tone_name,value:emotion.score})
    })
    let mycfg = {w:500, h:500, maxValue:0, levels:10};
    this.props.drawRadarChart('#emotion_tone', [data], mycfg);
    // console.log('what is the result',result);
    // console.log('what is the data for tone',data);
  }

  render () {
    return (
      <div id="emotion_tone">
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    watsonSentiment: state.watsonSentiment
  };
}

export default connect(mapStateToProps)(EmotionTone);
