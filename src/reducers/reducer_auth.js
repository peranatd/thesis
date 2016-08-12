export default function auth(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: '',
      userProfile: action.profile,
      userToken: action.token
    });
  case 'LOGIN_ERROR':
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.err
    });
  case 'LOGOUT_SUCCESS':
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  default:
    return state;
  }
}
