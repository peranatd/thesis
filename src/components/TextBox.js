import React, { Component } from 'react';
import $ from 'jquery';

class TextBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentWillReceiveProps(newProps) {
    $('textarea').val(newProps.speechToText[0]);
  }

  handleChange() {
    this.setState({
      text: $('textarea').val()
    })
  }

  handleSubmit() {
    let text = this.state.text;
    $.ajax({
      url:'/api/text',
      type:'POST',
      data: JSON.stringify({text: text}),
      contentType: 'application/json',
      success: function () {
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
        <button onClick={this.handleSubmit.bind(this) }>Upload Text</button>
      </div>
    );
  }
}

export default TextBox;
