export function ToneResponse (data,tone) {
  return {
    type: 'TONE_RESPONSE',
    payload: tone.concat([data])
  };
}

export function toneReset () {
  return {
    type: 'TONE_RESET',
    payload: []
  };
}
