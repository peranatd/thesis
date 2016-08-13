export function SpeechToTextResponse (data, speechtotext) {
  console.log('SPEECHTOTEXT ACTION ', data);
  return {
    type: 'SPEECHTOTEXT_RESPONSE',
    payload: speechtotext.concat([data.filter(sentence => sentence.final).reduce((a, b) => {
      return a += b.alternatives[0].transcript;
    }, '')])
  };
}
