export function WatsonSentimentResponse (sentiment, data) {
  return {
    type: 'WATSONSENTIMENT_RESPONSE',
    payload: sentiment
  };
}
