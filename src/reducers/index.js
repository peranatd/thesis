import { combineReducers } from 'redux';
import SentimentReducer from './reducer_sentiments';
import ToneReducer from './reducer_tone';
import SpeechToTextReducer from './reducer_speechtotext';
import Auth from './reducer_auth';

const rootReducer = combineReducers({
  sentiments: SentimentReducer,
  tone: ToneReducer,
  speechToText: SpeechToTextReducer,
  auth: Auth
});

export default rootReducer;
