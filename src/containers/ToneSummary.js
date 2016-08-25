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
          primary.push(primaryPhrase.toLowerCase().substring(0, primaryPhrase.length-1));
        }
        let secondaryPhrase = segment.analysis.Mood["Composite"].Secondary.Phrase;
        if(secondaryPhrase){
          secondary.push(secondaryPhrase.toLowerCase().substring(0, secondaryPhrase.length-1));
        }
      });
      this.setState({primary:primary.join().replace(/\./g, ',')+'.', secondary:secondary.join().replace(/\./g, ',')+'.'});
    }
  }

  render(){
    return(
      <div>
        <p><span className="glyphicon glyphicon-ok"></span>  Primary: {this.state.primary}</p>
        <p><span className="glyphicon glyphicon-ok"></span>  Secondary: {this.state.secondary}</p>
      </div>
    );
  }
}

export default ToneSummary;
