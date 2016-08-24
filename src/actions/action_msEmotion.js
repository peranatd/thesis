export function msEmotionResponse (data, msEmotion) {
  return {
    type: 'MSEMOTION_RESPONSE',
    payload: msEmotion.concat(data)
  };
}

export function msEmotionReset (data, msEmotion) {
  return {
    type: 'MSEMOTION_RESET',
    payload: msEmotion.slice(0, 0)
  };
}
