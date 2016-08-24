export default function(state = [], action) {
  switch(action.type) {
  case 'TONE_RESPONSE':
    return action.payload;
  case 'TONE_RESET':
    return action.payload;
  default:
    return state;
  }
}
