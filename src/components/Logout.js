import React from 'react';

const Logout = (props) => {
  return (
      <a href="#" onclick={() => props.onLogoutClick()}> Logout </a>
  );
};

export default Logout;