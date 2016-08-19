import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TranscriptionResponse } from '../actions/action_transcription.js';
import { WatsonSentimentResponse } from '../actions/action_watsonSentiment.js';
import { StreamingSttResponse } from '../actions/action_streamingstt.js';
import $ from 'jquery';

class TextBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
    this.props.socket.on('streamingSpeechToText', (data) => this.props.StreamingSttResponse(data, this.props.streamingStt));
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.TranscriptionResponse(nextState.text);
  }

  componentWillReceiveProps(newProps) {
    // $('textarea').val(newProps.speechToText[0]);
    $('textarea').val(newProps.streamingStt.join(''));
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    streamingStt: state.streamingStt
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    TranscriptionResponse: TranscriptionResponse,
    WatsonSentimentResponse: WatsonSentimentResponse,
    StreamingSttResponse: StreamingSttResponse
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
