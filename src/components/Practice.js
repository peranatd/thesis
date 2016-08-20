import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TextBox from './TextBox';
import Webcam from '../containers/Webcam';
import Chart from '../containers/Chart';


class Practice extends Component {
  constructor(props) {
    super(props);
  }

  handleTextChange (event) {
    event.target.value;
  }

  render () {
    return (
    <div className="container">
      <h1> Practice </h1>
      <div className="row">
        <Webcam />
        <TextBox speechToText={this.props.speechToText}/>
      </div>
      <div className="row">
        <Chart />
        <Link to="/result" className="btn btn-lg btn-primary" role="button">See Result</Link>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    speechToText: state.speechToText
  };
}

export default connect(mapStateToProps)(Practice);
