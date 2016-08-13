// credit: https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication
import Auth0Lock from 'auth0-lock';
import keys from '../keys';
// action creator for showing Lock
function showLock() {
  return {
    type: 'SHOW_LOCK'
  };
}

// action creator for login success
function loginSuccess(profile, token) {
  return {
    type: 'LOGIN_SUCCESS',
    profile,
    token
  };
}

// action creator for login error
function loginError(err) {
  return {
    type: 'LOGIN_ERROR',
    err
  };
}

// this function opens lock widget and dispatches actions
export function login() {
  const lock = new Auth0Lock(keys.AUTH0_CLIENT_ID, 'pasdesujin.auth0.com');
  return dispatch => {
    lock.show((err, profile, token) => {
      if (err) {
        dispatch(loginError(err));
        return;
      }
      // if user logs in successfully, add profile and id to localStorage, dispatch loginSuccess
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', token);
      dispatch(loginSuccess(profile, token));
    });
  };
}

// logout process
// using JWTs, remove the token from localStorage
function requestLogout() {
  return {
    type: 'LOGOUT_REQUEST',
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: 'LOGOUT_SUCCESS',
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  };
}
