export function msEmotionResponse (data, msEmotion) {
  return {
    type: 'MSEMOTION_RESPONSE',
    payload: msEmotion.concat(data)
  };
}

export function msEmotionReset () {
  return {
    type: 'MSEMOTION_RESET',
    payload: []
  };
}
