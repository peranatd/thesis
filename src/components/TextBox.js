import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TranscriptionResponse } from '../actions/action_transcription.js';
import { WatsonSentimentResponse } from '../actions/action_watsonsentiment.js';
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
    this.handleChange();
  }

  handleChange() {
    this.setState({
      text: $('textarea').val()
    });
  }

  handleSubmit() {
    let text = this.state.text;
    let context = this;
    $.ajax({
      url:'/api/text',
      type:'POST',
      data: JSON.stringify({text: text}),
      contentType: 'application/json',
      success: function (data) {
        // console.log(data);
        context.props.TranscriptionResponse(text, context.props.transcription);
        context.props.WatsonSentimentResponse(data);
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
        {JSON.stringify(this.props.watsonSentiment)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    transcription: state.transcription,
    watsonSentiment: state.watsonSentiment
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    TranscriptionResponse: TranscriptionResponse,
    WatsonSentimentResponse: WatsonSentimentResponse
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
