// export default Navbar;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add scroll effect for navbar
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo positioned outside the black nav area */}
        <div className="brand-center">
          <Link
            to="/"
            className="brand"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            MIKAZUKI
          </Link>
        </div>

        {/* Central navigation section with all links */}
        <div className={`nav-section ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/about" className="nav-link">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/explore" className="nav-link">
                EXPLORE
              </Link>
            </li>
            <li>
              <Link to="/create" className="nav-link">
                CREATE
              </Link>
            </li>
            <li>
              <Link to="/dao" className="nav-link">
                DAO
              </Link>
            </li>
            <li>
              <Link to="/socials" className="nav-link">
                SOCIALS
              </Link>
            </li>
            <li>
              <Link to="/buy" className="nav-link">
                BUY
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect button positioned similar to image */}
        <div className="connect-button-container">
          <button className="connect-button">CONNECT</button>
        </div>

        {/* Mobile menu toggle */}
        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <div className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
