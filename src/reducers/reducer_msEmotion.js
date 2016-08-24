export default function(state = [], action) {
  switch(action.type) {
  case 'MSEMOTION_RESPONSE':
    return action.payload;
  case 'MSEMOTION_RESET':
    return action.payload;
  default:
    return state;
  }
}
