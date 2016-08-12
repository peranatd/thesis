import { combineReducers } from 'redux';
import SentimentReducer from './reducer_sentiments';
import ToneReducer from './reducer_tone';
import SpeechToTextReducer from './reducer_speechtotext';

const rootReducer = combineReducers({
  sentiments: SentimentReducer,
  tone: ToneReducer,
  speechToText: SpeechToTextReducer
});

export default rootReducer;
