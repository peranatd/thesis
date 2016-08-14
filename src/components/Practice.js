import React, { Component } from 'react';
import TextBox from './TextBox';
import Webcam from '../containers/Webcam';
import Result from '../containers/Result';
import { connect } from 'react-redux';
import $ from 'jquery';

// import ImageUpload from './imageUpload';
// import Speech from './SpeechToText';

class Practice extends Component {
  constructor(props) {
    super(props);
  }

  // handleChange () {
  //   let text = this.state.text;
  //   $.ajax({
  //     url:'/api/text',
  //     type:'POST',
  //     data: JSON.stringify({text: text}),
  //     contentType: 'application/json',
  //     success: function () {
  //       console.log('ajax post request successfully');
  //     },
  //     error: function () {
  //       console.log('ajax post request failed!');
  //     }
  //   });
  // }

  handleTextChange (event) {
    event.target.value
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
};

function mapStateToProps(state) {
  return {
    speechToText: state.speechToText
  };
}

export default connect(mapStateToProps)(Practice);
