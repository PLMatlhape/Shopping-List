import React from 'react';
import './navBar.css';

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <img src="/Image/Logo.png" alt="Shopping List Logo" />
                    <span>Shopping List</span>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><a href="#home" className="active">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#categories">Categories</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="signup-btn">Sign Up</button>
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </nav>
        </header>
    );
};

export default NavBar;
