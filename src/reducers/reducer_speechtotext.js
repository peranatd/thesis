export default function(state = [], action) {
  console.log('SPEECH TO TEXT REDUCER ', action);
  switch(action.type) {
    case 'SPEECHTOTEXT_RESPONSE':
      return action.payload;
    default:
      return state;
  }
}
