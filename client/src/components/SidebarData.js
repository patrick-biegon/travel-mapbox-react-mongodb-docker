import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FcIcons from "react-icons/fc";

export const SidebarData = [
    {
        title: "Home",
        path: '/App',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: "About Us",
        path: '/AboutUs',
        icon: <FcIcons.FcAbout/>,
        cName: 'nav-text'
    },
    {
        title: "Help",
        path: '/Help',
        icon: <IoIcons.IoMdHelpCircleOutline/>,
        cName: 'nav-text'
    },
    {
        title: "Logout",
        path: '/Logout',
        icon: <AiIcons.AiOutlineLogout/>,
        cName: 'nav-text'
    },
]