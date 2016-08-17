import React, { Component } from 'react';
import { connect } from 'react-redux';

class SocialTone extends Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps (newProps) {
    //let result = JSON.parse(newProps.watsonSentiment);
    //this.props.drawRadarChart();

    //console.log('what is the watson Sentiment result',result);
  }

  render () {
    console.log('what is watsonSentiment', this.props.watsonSentiment);
    return (
      <div id="socialTone">
      {JSON.stringify(this.props.watsonSentiment)}
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