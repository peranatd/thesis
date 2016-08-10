import React from 'react';
import TextBox from './TextBox';
import ImageUpload from './imageUpload';
import Webcam from '../containers/Webcam';
import Speech from './SpeechToText';
import Result from '../containers/Result';

const Practice = () => (
  <div>
    <h1> Practice </h1>
    <TextBox />
    <ImageUpload />
    <Webcam />
    <Speech />
    <Result />
  </div>
);

export default Practice;