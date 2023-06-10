import React from 'react'
import { useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
import HamburgerMenu from "../../Assets/burger-menu-right-svgrepo-com.svg"
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from '../Login/LogoutButton/LogoutButton';
import LoginButton from '../Login/LoginButton/LoginButton';
import { TailSpin } from  'react-loader-spinner'
  

function Navbar() {
  const [menuState, setMenuState] = useState('navbar-menu-mobile')
  const toggleNavbarMenu = () => {
    menuState === 'navbar-menu-mobile' ? setMenuState("navbar-menu-mobile-visible") : setMenuState("navbar-menu-mobile")
  }
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <>
    <div className='navbar'>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><div id="company-name">Ratna Nidhi Foundation</div></Link>
        <div className='nav-controls'>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>Home</button></Link>
            <Link to="/about-us" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>About Us</button></Link>
            <Link to="/contact-us" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>Contact Us</button></Link>
            <Link to="/donations" style={{ textDecoration: 'none', color: 'black' }}><button className='nav-controls-btns'>Donate</button></Link>
            {isAuthenticated ?  <LogoutButton /> : isLoading ? <TailSpin
                                                                  height="50"
                                                                  width="50"
                                                                  color="#4fa94d"
                                                                  ariaLabel="tail-spin-loading"
                                                                  radius="1"
                                                                  wrapperStyle={{}}
                                                                  wrapperClass=""
                                                                  visible={true}
                                                                /> :<LoginButton />}
        </div>
        <button id="hamburger-menu-mobile" onClick={toggleNavbarMenu}><img src={HamburgerMenu} alt="hamburger menu" height={"20vh"}/></button>
    </div>
    <div className={menuState}>
      <div className='navbar-menu-mobile-list'>
        <Link to="/" style={{ color: 'black' }}><button className='nav-controls-btns' onClick={toggleNavbarMenu}>Home</button></Link>
        <Link to="/about-us" style={{ color: 'black' }}><button className='nav-controls-btns' onClick={toggleNavbarMenu}>About Us</button></Link>
        <Link to="/contact-us" style={{ color: 'black' }}><button className='nav-controls-btns' onClick={toggleNavbarMenu}>Contact Us</button></Link>
        <Link to="/donations" style={{ color: 'black' }}><button className='nav-controls-btns' onClick={toggleNavbarMenu}>Donate</button></Link>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
</>
  )
}

export default Navbar