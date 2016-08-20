export function ToneResponse (data,tone) {
  return {
    type: 'TONE_RESPONSE',
    payload: tone.concat([data])
  };
}
