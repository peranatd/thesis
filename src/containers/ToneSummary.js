import React, { Component } from 'react';

class ToneSummary extends Component {
  constructor(props){
    super(props);
    this.state = {primary: '?', secondary: '?'};
  }

  componentWillMount() {
    if(this.props.tone[0]){
      let result = this.props.tone[0].result.analysisSegments || [];
      let primary = [];
      let secondary = [];
      result.forEach(function(segment){
        let primaryPhrase = segment.analysis.Mood["Composite"].Primary.Phrase;
        if(primaryPhrase){
          primary.push(primaryPhrase.toLowerCase());
        }
        let secondaryPhrase = segment.analysis.Mood["Composite"].Secondary.Phrase;
        if(secondaryPhrase){
          secondary.push(secondaryPhrase.toLowerCase());
        }
      });
      this.setState({primary:primary.join(), secondary:secondary.join()});
    }
  }

  render(){
    return(
      <div>
        <p><span className="glyphicon glyphicon-ok"></span> You have mainly {this.state.primary}</p>
        <p><span className="glyphicon glyphicon-ok"></span> But you also have {this.state.secondary}</p>
      </div>
    );
  }
}

export default ToneSummary;
