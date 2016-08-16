export default function(state = [], action) {
  switch(action.type) {
  case 'TRANSCRIPTION_RESPONSE':
    return action.payload;
  default:
    return state;
  }
}
