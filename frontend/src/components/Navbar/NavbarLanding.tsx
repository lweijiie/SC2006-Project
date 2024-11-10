import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavbarLanding.css';
import Logo from '../../assets/logo.svg';

function NavbarLanding() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <nav className="navbarlanding">
            <div className="navbar-container">
                {/* Logo on the left */}
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo-image" />
                    </Link>
                </div>
                {/* Navigation links wrapped in ul */}
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="navbar-items">
                        <Link to="/about-us" className="navbar-link" onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className="navbar-items">
                        <Link to="/contact-us" className="navbar-link" onClick={closeMobileMenu}>
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavbarLanding;