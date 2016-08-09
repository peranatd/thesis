import React from 'react';
import TextBox from './TextBox';
import ImageUpload from './imageUpload';
import Webcam from './Webcam';
import Speech from './SpeechToText';

const Practice = () => (
  <div>
    <h1> Practice </h1>
    <TextBox />
    <ImageUpload />
    <Webcam />
    <Speech />
  </div>
);

export default Practice;