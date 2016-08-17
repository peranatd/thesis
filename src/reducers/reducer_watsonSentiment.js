export default function(state = {}, action) {
  switch(action.type) {
  case 'WATSONSENTIMENT_RESPONSE':
    return action.payload;
  default:
    return state;
  }
}
