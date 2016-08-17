// TODO: to be replaced with streaming recognise version
export function SpeechToTextResponse (data, speechtotext) {
  console.log('SPEECHTOTEXT ACTION ', JSON.stringify(speechtotext, null, 3));
  return {
    type: 'SPEECHTOTEXT_RESPONSE',
    payload: speechtotext.concat([data.filter(sentence => sentence.final).reduce((a, b) => {
      return a += b.alternatives[0].transcript;
    }, '')])
  };
}

// export function ManualInput (newInput, speechtotext) {
//   return {
//     type: 'MANUAL_INPUT',
//     payload: [newInput]
//   };
// }
