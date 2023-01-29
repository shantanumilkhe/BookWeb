import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

function Navbar() {
  let navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [admin, setAdmin] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const authenticateAdmin = async () => {
    let token = localStorage.getItem('token');
    await axios.get('/auth/authenticate', { headers: { Authorization: token } }).then(res => {
      if (res.data.success == true) { setAdmin(true) }
    })
  }
  useEffect(() => {
    showButton();
    authenticateAdmin();
  }, [authenticateAdmin]);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-logo' onClick={() => { setClick(false); navigate('/'); }}>
            Maha TPC
            <i class='fab fa-typo3' />
          </div>
          <div className='menu-icon' onClick={() => setClick(!click)}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <div className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className='nav-item'>
              <div className='nav-links' onClick={() => { setClick(false); navigate('/'); }}>
                Home
              </div>
            </div>
            <div className='nav-item'>
              <div
                className='nav-links'
                onClick={() => { setClick(false); navigate('/services'); }}
              >
                Services
              </div>
            </div>
            <div className='nav-item'>
              <div
                className='nav-links'
                onClick={() => { setClick(false); navigate('/book'); }}
              >
                Book
              </div>
            </div>
            {!admin ? null :
                <>
                <div className='nav-item'>
                  <div
                    className='nav-links'
                    onClick={() => { setClick(false); navigate('/upload'); }}
                  >
                    Upload
                  </div>
                </div>
                <div className='nav-item'>
                  <div
                    className='nav-links'
                    onClick={() => { setClick(false); localStorage.clear(); navigate('/');window.location.reload()}}
                  >
                    Logout
                  </div>
                </div>
                </>
            }
          </div>
          {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
