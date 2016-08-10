import { combineReducers } from 'redux';
import SentimentReducer from './reducer_sentiments';

const rootReducer = combineReducers({
  sentiments: SentimentReducer
});

export default rootReducer;