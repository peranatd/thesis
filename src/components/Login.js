import React from 'react';

const Login = (props) => {
  return (
    <a href='#' onClick={()=> props.onLoginClick()} >
      Login
    </a>
  );
};

export default Login;