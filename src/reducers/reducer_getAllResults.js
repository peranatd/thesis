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
    console.log(action.payload);
    return action.payload;
  default:
    return state;
  }
}