import React from 'react';
import { TagCloud } from "react-tagcloud";

const options = {
  luminosity: 'light',
  hue: 'blue'
};

class Tone_Cloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: []
    };
  }
  componentWillMount(){
    if(this.props.tone[0]){
      let result = this.props.tone[0].result.analysisSegments || [];
      let self = this;
      let mood=[];
      let data=[];
      let obj={};
      if(result.length !== 0){
        result.forEach(function(segment){
          let primaryPhrase = segment.analysis.Mood["Group11"].Primary.Phrase.split(',');
          let secondaryPhrase = segment.analysis.Mood["Group11"].Secondary.Phrase.split(',');
          primaryPhrase.forEach(function(keyword){
            mood.push(keyword);
          });
          secondaryPhrase.forEach(function(keyword){
            mood.push(keyword);
          });
          mood.forEach(function(keyword){
            let count=1;
            if(obj[keyword]){
              obj[keyword] = ++count;
            }else{
              obj[keyword] = count;
            }
          });
          for(let key in obj){
            data.push({value:key,count:obj[key]});
          }
          self.setState({mood:data});
        });
      }
    }
  }

  render() {
    return (
      <div className="col-md-3">
        <TagCloud
          colorOptions={options}
          minSize={15}
          maxSize={20}
          tags={this.state.mood}
          className="stackCloud" />
      </div>
    );
  }
}

export default Tone_Cloud;
