export function StreamingSttResponse (data, previous) {
  return {
    type: 'STREAMINGSTT_RESPONSE',
    payload: _moreUpdates(data, previous)
  };
}

export function sttReset () {
  return {
    type: 'STT_RESET',
    payload: []
  };
}

function _moreUpdates (data, previous) {
  const result = [...previous];
  const index = data['result_index'];
  let sentence = data.results[0].alternatives[0].transcript;
  if (data.results[0].final) {
    sentence = [sentence[0].toUpperCase(), ...sentence.slice(1, sentence.length-1), '.', ' '].join('');
  }
  result[index] = sentence;
  return result;
}
