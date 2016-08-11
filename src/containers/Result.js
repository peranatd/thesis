import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div classname="Result">
        <h3>Sentiment Result</h3>
        {this.props.sentiment}
        <h3>Tone Result</h3>
        {this.props.tone}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sentiment: state.sentiments,
    tone: state.tone
  }
}

export default connect(mapStateToProps)(Result);