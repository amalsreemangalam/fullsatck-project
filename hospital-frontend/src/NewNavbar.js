
import React from 'react';
import { Link } from 'react-router-dom';


const NewNavbar = () => {
  
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    color: 'white',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyle = {
    width: '40px', 
    height: 'auto',
    marginRight: '10px',
  };

  const logoTextStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const navbarLinksStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  };

  const navbarLinkStyle = {
    padding: '8px 16px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
    transition: 'color 0.3s',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoContainerStyle}>
        <img
          src="/logo.png"
          alt="Logo"
          style={logoStyle}
        />
        <span style={logoTextStyle}></span>
      </div>
      <ul style={navbarLinksStyle}>
        <li style={navbarLinkStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={navbarLinkStyle}>
          <Link to="/financial-report" style={linkStyle}>Financial Report</Link>
        </li>
        <li style={navbarLinkStyle}>
          <Link to="/bill-statement" style={linkStyle}>Bill Statement</Link>
        </li>
        <li style={navbarLinkStyle}>
          <Link to="/landing-page" style={linkStyle}>Avaiiable Doctors</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NewNavbar;
