import React from 'react';
import { Link } from 'react-router';

import Login from './Login';

//import { login, logoutUser } from '../actions/action_auth';

const Navbar = () => {
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
        <Login />
      </li>
    </ul>
  </div>
  )};

export default Navbar;