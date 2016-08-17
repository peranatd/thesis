import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TagCloud } from "react-tagcloud";
import $ from 'jquery';

const dummyData = [
  { value: "Angular", count: 38 },
  { value: "React", count: 30 },
  { value: "Nodejs", count: 28 },
  { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 },
  { value: "CSS3", count: 33 },
  { value: "MongoDB", count: 18 },
  { value: "MEAN", count: 50 },
  { value: "JavaScript", count: 70 },
  { value: "PHP", count: 30 },
  { value: "JQuery", count: 40 },
  { value: "MERN", count: 20 },
  { value: "Vue", count: 10 },
  { value: "Backbone", count: 10 }
];

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
          minSize={12}
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
