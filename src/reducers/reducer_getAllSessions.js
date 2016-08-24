export default function(state = {}, action) {
  switch(action.type) {
  case 'GETALLSESSIONS':
    return action.payload;
  default:
    return state;
  }
}
