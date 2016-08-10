import React, { Component } from 'react';
import { connect } from 'react-redux';

class Result extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div classname="Result">
        <h3>Result</h3>
        {this.props.sentiment}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sentiment: state.sentiments
  }
}

export default connect(mapStateToProps)(Result);