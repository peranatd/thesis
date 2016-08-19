import React, { Component } from 'react';
import { connect } from 'react-redux';

class ToneSummary extends Component {
  constructor(props){
    super(props);
    this.state = {primary: '?', secondary: '?'};
  }

  componentWillReceiveProps(newProps) {
    let result = JSON.parse(newProps.tone)[0].result.analysisSegments;
    let primary = [];
    let secondary = [];
    console.log('what is the result for summary', result);
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

function mapStateToProps(state) {
  return {
    tone: state.tone
  };
}

export default connect(mapStateToProps)(ToneSummary);
