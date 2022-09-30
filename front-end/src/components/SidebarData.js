import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md'

export const SidebarData = 
  [
  {
    title: "Home",
    path: '/',
    icon: <AiIcons.AiFillHome/>,
    cName: 'nav-text'
  },
  {
    title: "Sales",
    path: '/sales',
    icon: <FaIcons.FaShoppingCart/>,
    cName: 'nav-text'
  },
  {
    title: "Inventory",
    path: '/inventory',
    icon: <MdIcons.MdOutlineInventory/>,
    cName: 'nav-text'
  },
  {
    title: "User",
    path: '/user',
    icon: <IoIcons.IoMdPeople/>,
    cName: 'nav-text'
  },
  {
    title: "Report",
    path: '/report',
    icon: <IoIcons.IoIosPaper/>,
    cName: 'nav-text'
  }
]

