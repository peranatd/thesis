export function getAllResults (data, initialResult) {
  return {
    type: 'GETALLRESULTS',
    payload: {
      result: Object.assign({}, initialResult, data)
    }
  };
}
