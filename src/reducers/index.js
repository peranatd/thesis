import { combineReducers } from 'redux';
import SentimentReducer from './reducer_sentiments';
import ToneReducer from './reducer_tone';
import SpeechToTextReducer from './reducer_speechtotext';
import Auth from './reducer_auth';
import SocketReducer from './reducer_socket';

const rootReducer = combineReducers({
  sentiments: SentimentReducer,
  tone: ToneReducer,
  speechToText: SpeechToTextReducer,
  auth: Auth,
  socket: SocketReducer
});

export default rootReducer;
