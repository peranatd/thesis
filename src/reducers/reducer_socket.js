export default function(state = [], action) {
  switch (action.type) {
  case 'NEW_SOCKET':
    return action.payload;
  default:
    return state;
  }
}
