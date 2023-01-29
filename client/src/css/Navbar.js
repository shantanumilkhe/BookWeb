import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  let navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-logo' onClick={()=>{setClick(false);navigate('/');}}>
          Maha TPC
            <i class='fab fa-typo3' />
          </div>
          <div className='menu-icon' onClick={()=>setClick(!click)}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <div className='nav-links' onClick={()=>{setClick(false);navigate('/');}}>
                Home
              </div>
            </li>
            <li className='nav-item'>
              <div
                className='nav-links'
                onClick={()=>{setClick(false);navigate('/services');}}
              >
                Services
              </div>
            </li>
            <li className='nav-item'>
              <div
                className='nav-links'
                onClick={()=>{setClick(false);navigate('/book');}}
              >
                Book
              </div>
            </li>
            <li className='nav-item'>
              <div
                className='nav-links'
                onClick={()=>{setClick(false);navigate('/upload');}}
              >
                Upload
              </div>
            </li>
            <li>
              <div
                className='nav-links-mobile'
                onClick={()=>{setClick(false);navigate('/signup');}}
              >
                Sign Up
              </div>
            </li>
          </ul>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
