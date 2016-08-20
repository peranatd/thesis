import React from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <ul className="list-unstyled list-inline">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/team">OurTeam</Link></li>
      </ul>
    </div>
  </footer>
  );

export default Footer;