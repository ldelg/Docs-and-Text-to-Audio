import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import { useMediaQuery } from "@react-hook/media-query";
import AboutIcon from "./MobileNavbar/icons/about.png";
import Speech2TextIcon from "./MobileNavbar/icons/speech2text-icon.png";
import Text2SpeechIcon from "./MobileNavbar/icons/text2speech-icon.png";


const Navbar = () => {
  const links = [
    { to: "/", text: "Text2Speech", icon: Text2SpeechIcon, alt: "Text 2 Speech icon" },
    { to: "/Speech2Text", text: "Speech2Text", icon: Speech2TextIcon, alt: "Speech 2 Text icon" },
    { to: "/About", text: "About", icon: AboutIcon, alt: "About Icon" },
  ];

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {isMobile ? (
        <MobileNavbar links={links} click={click} handleClick={handleClick} />
      ) : (
        <nav className="navbar">
          <div className="nav-container">
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              {links.map((link, index) => (
                <li className="nav-item" key={index}>
                  <NavLink
                    to={link.to}
                    className="nav-links"
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
