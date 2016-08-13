import React from 'react';
import TextBox from './TextBox';
import Webcam from '../containers/Webcam';
import Result from '../containers/Result';
// import ImageUpload from './imageUpload';
// import Speech from './SpeechToText';

const Practice = () => (
  <div>
    <h1> Practice </h1>
    <Webcam />
    <TextBox />
    <Result />
    {/*<Speech />*/}
    {/*<ImageUpload />*/}
  </div>
);

export default Practice;
