import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/projects">PROJECTS</Link></li>
                <li><Link to ="/experience">EXPERIENCE</Link></li>
                <li><Link to ="/resume">RESUME</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;