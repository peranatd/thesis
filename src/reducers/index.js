import { combineReducers } from 'redux';
import SentimentReducer from './reducer_sentiments';
import ToneReducer from './reducer_tone';

const rootReducer = combineReducers({
  sentiments: SentimentReducer,
  tone: ToneReducer
});

export default rootReducer;