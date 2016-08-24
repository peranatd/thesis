export default function(
  state = {
    msEmotion: undefined,
    transcript: undefined,
    bv: undefined,
    watson: undefined
  },
  action) {
  switch(action.type) {
  case 'GETALLRESULTS':
    return action.payload;
  default:
    return state;
  }
}
