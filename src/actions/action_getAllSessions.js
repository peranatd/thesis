export function getAllSessions (data) {
  return {
    type: 'GETALLSESSIONS',
    payload: {
      sessions: data.map(session => session.session_timestamp),
      sessionId: data.reduce((memo, item) => {
        memo[item.session_timestamp] = item.id;
        return memo;
      }, {})
    }
  };
}
