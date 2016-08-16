import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TranscriptionResponse } from '../actions/action_transcription.js';
import $ from 'jquery';

class TextBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(newProps) {
    $('textarea').val(newProps.speechToText[0]);
  }

  handleChange() {
    this.setState({
      text: $('textarea').val()
    });
  }

  handleSubmit() {
    let text = this.state.text;
    $.ajax({
      url:'/api/text',
      type:'POST',
      data: JSON.stringify({text: text}),
      contentType: 'application/json',
      success: function (data) {
        this.props.TranscriptionResponse(text, this.props.transcription);
        console.log('ajax post request successfully');
      },
      error: function () {
        console.log('ajax post request failed!');
      }
    });
  }

  render() {
    return (
      <div >
        <h2>TextBox</h2>
        <p>Please upload your text file</p>
        <textarea rows="4" placeholder="Write down your transcription here..." onChange={this.handleChange.bind(this)} />
        <button onClick={this.handleSubmit.bind(this)}>Upload Text</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transcription: state.transcription
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    TranscriptionResponse: TranscriptionResponse
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
