export default function(state = [], action) {
  switch(action.type) {
    case 'SENTIMENT_RESPONSE':
      return [action.payload];
    default:
      return state;
  }
}