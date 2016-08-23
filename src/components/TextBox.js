import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TranscriptionResponse } from '../actions/action_transcription.js';
import { WatsonSentimentResponse } from '../actions/action_watsonSentiment.js';
import { StreamingSttResponse } from '../actions/action_streamingstt.js';
import { browserHistory } from 'react-router';
import $ from 'jquery';

class TextBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ''
    };
    this.props.socket.on('streamingSpeechToText',
      (data) => this.props.StreamingSttResponse(data, this.props.streamingStt)
    );
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.TranscriptionResponse(nextState.text);
  }

  componentWillReceiveProps(newProps) {
    $('textarea').val(newProps.streamingStt.join(''));
    this.handleChange();
  }

  handleChange() {
    this.setState({
      text: $('textarea').val()
    });
  }

  handleSubmit() {
    let self = this;
    $.ajax({
      url:'/api/text',
      type:'POST',
      data: JSON.stringify({
        text: self.state.text,
        sessionTimestamp: self.props.sessionTimestamp,
        user: self.props.user.username
      }),
      contentType: 'application/json',
      success: function (data) {
        self.props.WatsonSentimentResponse(data);
        browserHistory.push('/result');
      },
      error: function () {
        console.log('ajax post request failed!');
      }
    });
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="form-group">
          <textarea
            className="form-control"
            rows="23"
            placeholder="We will transform your speech into text in this box but you can also write down your transcription here..."
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button
          onClick={this.handleSubmit.bind(this)}
          className="btn btn-default">
           Submit
           <span className="glyphicon glyphicon-send"></span>
        </button>
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
