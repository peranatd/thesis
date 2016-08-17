import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TagCloud } from "react-tagcloud";
import $ from 'jquery';

const options = {
  luminosity: 'light',
  hue: 'blue'
};

class Tone_Cloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: []
    }
  }
  componentWillReceiveProps(newProps){
    let result = JSON.parse(newProps.tone)[0].result.analysisSegments;
    let self = this;
    let mood=[];
    let data=[];
    let obj={};
    result.forEach(function(segment){
      let primaryPhrase = segment.analysis.Mood["Group11"].Primary.Phrase.split(',');
      let secondaryPhrase = segment.analysis.Mood["Group11"].Secondary.Phrase.split(',');
      primaryPhrase.forEach(function(keyword){
        mood.push(keyword);
      });
      secondaryPhrase.forEach(function(keyword){
        mood.push(keyword);
      })
      mood.forEach(function(keyword){
        let count=1;
        if(obj[keyword]){
          obj[keyword] = ++count;
        }else{
          obj[keyword] = count;
        }
      })
      for(let key in obj){
        data.push({value:key,count:obj[key]})
      }
      self.setState({mood:data});
    })
  }

  render() {
    return (
        <TagCloud
          colorOptions={options}
          minSize={25}
          maxSize={35}
          tags={this.state.mood}
          className="stackCloud" />
    );
  }
}


function mapStateToProps(state) {
  return {
    tone: state.tone
  };
}

export default connect(mapStateToProps)(Tone_Cloud);
