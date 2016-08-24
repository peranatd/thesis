export function TranscriptionResponse (transcription, data) {
  return {
    type: 'TRANSCRIPTION_RESPONSE',
    payload: [transcription]
  };
}

export function transcriptionReset () {
  return {
    type: 'TRANSCRIPTION_RESET',
    payload: []
  };
}
