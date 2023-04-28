import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { CheckForAdminAccess } from './PrivateRouteUser';
import * as IoIcons from 'react-icons/io';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);


  const showSidebar = () => {
    setSidebar(!sidebar);
    console.log();
  };


  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className='app-title'>Icy Delivery</h1>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: 99 }}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>


            {/* if admin is logged in, then render admin options only. if it's a regular user logged in, then render user options. if not logged in, render login and create account */}
            {(() => {
              if (localStorage.userIsLoggedIn === "true" && localStorage.admin === "true" && CheckForAdminAccess() === true) {
                return (
                  <>
                    <li className='nav-text'>
                      <Link to='/'>
                        <AiIcons.AiFillHome />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li className='nav-text'>
                      <Link to='/inventorymanagement'>
                        <FaIcons.FaClipboard />
                        <span>Inventory Management</span>
                      </Link>'
                    </li>
                    <li className='nav-text'>
                      <Link to='/shipmenttracking'>
                        <FaIcons.FaShippingFast />
                        <span>Shipment Tracking</span>
                      </Link>
                    </li>

                    <li className='nav-text'>
                      <Link to='/trouble-ticket-management'>
                        <IoIcons.IoMdClipboard />
                        <span>Trouble Ticket Management</span>
                      </Link>
                    </li>

                    <li className='nav-text'>
                      <Link to='/logout'>
                        <AiIcons.AiOutlineLogout />
                        <span>Logout</span>
                      </Link>
                    </li>
                  </>
                )
              } else if (localStorage.userIsLoggedIn === "true") {
                return (
                  SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })
                )
              } else {
                return (
                  <>
                    <li className='nav-text'>
                      <Link to='/login'>
                        <FaIcons.FaSignInAlt />
                        <span>Login</span>
                      </Link>
                    </li>

                    <li className='nav-text'>
                      <Link to='/create-account'>
                        <FaIcons.FaUserPlus />
                        <span>Create Account</span>
                      </Link>
                    </li>
                  </>
                )
              }
            })()};


          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

