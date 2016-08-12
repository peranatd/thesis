export function SentimentResponse (data,sentiments) {
  return {
    type: 'SENTIMENT_RESPONSE',
    payload: sentiments.concat(data.response)
  };
}
