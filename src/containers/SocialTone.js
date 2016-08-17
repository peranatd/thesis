import React, { Component } from 'react';
import { connect } from 'react-redux';

class SocialTone extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps (newProps) {
    let result = newProps.watsonSentiment.document_tone.tone_categories;
    let socialTone;
    result.forEach(function(category){
      if(category.category_id === 'social_tone') {
        socialTone = category.tones;
      }
    });
    let data =[];
    socialTone.forEach(function(emotion){
      data.push({axis:emotion.tone_name, value:emotion.score});
    });
    let mycfg = {w:500, h:500, maxValue:0, levels:10};
    this.props.drawRadarChart('#socialTone',[data], mycfg);
  }

  render () {
    return (
      <div id="socialTone">
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    watsonSentiment: state.watsonSentiment
  };
}

export default connect(mapStateToProps)(SocialTone);