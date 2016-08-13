export function socketAction (newsocket, oldsocket) {
  return {
    type: 'NEW_SOCKET',
    payload: newsocket
  };
}
