export function StreamingSttResponse (data, previous) {
  return {
    type: 'STREAMINGSTT_RESPONSE',
    payload: [...previous, ..._streaming(data)]
  };
}

function _streaming (data) {
  const result = [];
  if (data.results[0].final) {
    let sentence = data.results[0].alternatives[0].transcript;
    result.push([sentence[0].toUpperCase(), ...sentence.slice(1, sentence.length-1), '.', ' '].join(''));
  }
  return result;
}
