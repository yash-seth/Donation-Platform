import React from 'react'
import { useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import HamburgerMenu from "../../Assets/burger-menu-right-svgrepo-com.svg"
  

function Navbar() {
  const [menuState, setMenuState] = useState('navbar-menu-mobile')
  const toggleNavbarMenu = () => {
    menuState === 'navbar-menu-mobile' ? setMenuState("navbar-menu-mobile-visible") : setMenuState("navbar-menu-mobile")
  }
  return (
    <>
    <div className='navbar'>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><div id="company-name">Ratna Nidhi Foundation</div></Link>
        <div className='nav-controls'>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>Home</button></Link>
            <Link to="/about-us" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>About Us</button></Link>
            <Link to="/contact-us" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>Contact Us</button></Link>
            <Link to="/donations" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>Donate</button></Link>
        </div>
        <button id="hamburger-menu-mobile" onClick={toggleNavbarMenu}><img src={HamburgerMenu} alt="hamburger menu" height={"20vh"}/></button>
    </div>
    <div className={menuState}>
      <div className='navbar-menu-mobile-list'>
        <Link to="/" style={{ color: 'black' }}><button className='nav-controls-btns'>Home</button></Link>
        <Link to="/about-us" style={{ color: 'black' }}><button className='nav-controls-btns'>About Us</button></Link>
        <Link to="/contact-us" style={{ color: 'black' }}><button className='nav-controls-btns'>Contact Us</button></Link>
        <Link to="/donations" style={{ color: 'black' }}><button className='nav-controls-btns'>Donate</button></Link>
      </div>
    </div>
</>
  )
}

export default Navbar