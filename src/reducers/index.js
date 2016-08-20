import { combineReducers } from 'redux';
import msEmotionReducer from './reducer_msEmotion';
import ToneReducer from './reducer_tone';
import SpeechToTextReducer from './reducer_speechtotext';
import SocketReducer from './reducer_socket';
import TranscriptReducer from './reducer_transcription';
import WatsonSentimentReducer from './reducer_watsonSentiment';
import StreamingSttReducer from './reducer_streamingstt';

const rootReducer = combineReducers({
  msEmotion: msEmotionReducer,
  tone: ToneReducer,
  speechToText: SpeechToTextReducer,
  socket: SocketReducer,
  transcription: TranscriptReducer,
  watsonSentiment: WatsonSentimentReducer,
  streamingStt: StreamingSttReducer
});

export default rootReducer;
