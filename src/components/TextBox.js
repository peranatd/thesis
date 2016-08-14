import React, { Component } from 'react';

const TextBox = (props) => {
  return (
    <div >
      <h2>TextBox</h2>
      <p>Please upload your text file</p>
      <textarea rows="4" placeholder="Write down your transcription here..." value={props.speechToText[0]} />
      <button>Upload Text</button>
    </div>
  );
}

export default TextBox;
