import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { NavLink } from 'react-router-dom';
import "./MobileNavbar.css";

const MobileNavbar = ({ links, click, handleClick }) => {
  return (
    <BottomNavigation
      showLabels
      className={`mobile-navbar ${click ? "active" : ""}`}
    >
      {links.map((link, index) => (
        <BottomNavigationAction
          className='mobile-nav-links'
          key={index}
          label={link.text}
          icon={<img className="icon" src={link.icon} alt={link.alt} /> }
          component={NavLink}
          to={link.to}
          onClick={handleClick}
        />
      ))}
    </BottomNavigation>
  );
}

export default MobileNavbar;

