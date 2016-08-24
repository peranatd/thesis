export default function(state = [], action) {
  switch(action.type) {
  case 'STREAMINGSTT_RESPONSE':
    return action.payload;
  case 'STT_RESET':
    return action.payload;
  default:
    return state;
  }
}
