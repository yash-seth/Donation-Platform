import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
  

function Navbar() {
  return (
    <div className='navbar'>
        <div className='nav-controls'>
            <Link to="/" style={{ color: 'black' }}><button className='nav-controls-btns'>Home</button></Link>
            <Link to="/about-us" style={{ color: 'black' }}><button className='nav-controls-btns'>About Us</button></Link>
            <Link to="/contact-us" style={{ color: 'black' }}><button className='nav-controls-btns'>Contact Us</button></Link>
            <Link to="/donations" style={{ color: 'black' }}><button className='nav-controls-btns'>Donate</button></Link>
        </div>
    </div>
  )
}

export default Navbar