import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  //  {
  //    title: 'Inventory',
  //    path: '/inventorymanagement',
  //    icon: <FaIcons.FaClipboardList />,
  //    cName: 'nav-text'
  //  },
  // {
  //   title: 'Shipment Tracking',
  //   path: '/shipmenttracking',
  //   icon: <FaIcons.FaCartPlus />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Trouble Tickets',
    path: '/troubletickets',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Account',
    path: '/account',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];
