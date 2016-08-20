import React, { Component } from 'react';

class ToneSummary extends Component {
  constructor(props){
    super(props);
    this.state = {primary: '?', secondary: '?'};
  }

  componentWillMount() {
    if(this.props.tone[0]){
      let result = this.props.tone[0].result.analysisSegments;
      let primary = [];
      let secondary = [];
      result.forEach(function(segment){
        let primaryPhrase = segment.analysis.Mood["Composite"].Primary.Phrase;
        if(primaryPhrase){
          primary.push(primaryPhrase);
        }
        let secondaryPhrase = segment.analysis.Mood["Composite"].Secondary.Phrase;
        if(secondaryPhrase){
          secondary.push(secondaryPhrase);
        }
      });
      this.setState({primary:primary.join(), secondary:secondary.join()});
    }
  }

  render(){
    return(
      <div>
        <h3>Summary of the tone analyze</h3>
        <p>You are mainly {this.state.primary}</p>
        <p>But you are also {this.state.secondary} as well</p>
      </div>
    );
  }
}

export default ToneSummary;
