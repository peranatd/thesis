import io from 'socket.io-client';
const socket = io();

export default function () {
  let sentiments = [];
  socket.on('emotion', (data) => {
      sentiments = sentiments.concat([data.response]);
    });
  return {
    type: 'SENTIMENT_RESPONSE',
    payload: sentiments
  };
}