import React, { Component } from 'react';
import $ from 'jquery';

class TextBox extends Component {
  constructor (props) {
    super(props);
    this.state = {text: ''};
  }

  handleChange () {
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

  render () {
    return (
      <div >
        <h2>TextBox</h2>
        <p>Please upload your text file</p>
        <textarea rows="4" placeholder="Write down your transcription here..." onChange={(e)=>{this.setState({text: e.target.value});}} />
        <button onClick={this.handleChange.bind(this)}>Upload Text</button>
      </div>
    );
  }
}

export default TextBox;
