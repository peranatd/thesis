export function TranscriptionResponse (transcription, data) {
  return {
    type: 'TRANSCRIPTION_RESPONSE',
    payload: data.concat([transcription])
  };
}