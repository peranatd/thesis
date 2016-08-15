import React, { Component } from 'react';
import TextBox from './TextBox';
import Webcam from '../containers/Webcam';
import Result from '../containers/Result';
import { connect } from 'react-redux';

// import ImageUpload from './imageUpload';
// import Speech from './SpeechToText';

class Practice extends Component {
  constructor(props) {
    super(props);
  }

  handleTextChange (event) {
    event.target.value;
  }

  render () {
    return (
    <div>
      <h1> Practice </h1>
      <Webcam />
      <div>{this.props.speechToText[0]}</div>
      <TextBox speechToText={this.props.speechToText}/>
      <Result />
      {/*<Speech />*/}
      {/*<ImageUpload />*/}
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
