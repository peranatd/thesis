// TODO: this is about to be replaced by streaming version
export default function(state = [], action) {
  switch(action.type) {
  case 'SPEECHTOTEXT_RESPONSE':
    return action.payload;
  default:
    return state;
  }
}
