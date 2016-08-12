export function SpeechToTextResponse (data,speechtotext) {
  console.log('SPEECHTOTEXT ACTION ', speechtotext);
  return {
    type: 'SPEECHTOTEXT_RESPONSE',
    payload: speechtotext.concat([data])
  };
}
