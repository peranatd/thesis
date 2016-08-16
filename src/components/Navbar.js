import React from 'react';
import { Link } from 'react-router';

import Login from './Login';
import Logout from './Logout';
import { login, logoutUser } from '../actions/action_auth';

const Navbar = (props) => {
  return(
    <div>
      <Link to="/">
        Speak Mirror
      </Link>
      <ul>
        <li>
          <Link to="practice">
            Practice
          </Link>
        </li>
        <li>
          {!props.isAuthenticated &&
            <Login
              errorMessage={props.errorMessage}
              onLoginClick={() => props.dispatch(login())}
            />
          }

          {props.isAuthenticated &&
            <Logout onLogoutClick={() => props.dispatch(logoutUser())} />
          }
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
