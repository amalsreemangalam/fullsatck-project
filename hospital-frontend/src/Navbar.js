import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/financial-report">Financial Report</Link></li>
        <li><Link to="/bill-statement">Bill Statement</Link></li>

        <li><Link to="/landing-page">Avaliable doctors</Link></li> {/* Add link to Landing Page */}
      </ul>
    </nav>
  );
};

export default Navbar;
