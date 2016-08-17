import { combineReducers } from 'redux';
import msEmotionReducer from './reducer_msEmotion';
import ToneReducer from './reducer_tone';
import SpeechToTextReducer from './reducer_speechtotext';
import Auth from './reducer_auth';
import SocketReducer from './reducer_socket';
import TranscriptReducer from './reducer_transcription';

const rootReducer = combineReducers({
  msEmotion: msEmotionReducer,
  tone: ToneReducer,
  speechToText: SpeechToTextReducer,
  auth: Auth,
  socket: SocketReducer,
  transcription: TranscriptReducer
});

export default rootReducer;
