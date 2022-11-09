import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

export default function Sidebar() {
    return (
        <CDBSidebar textColor="#fff" backgroundColor="#333" style={{ height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                Pharmacy POS
            </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
                <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/sales" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="shopping-cart">Sales</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/inventory" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="box">Inventory</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/users" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/report" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="file">Report</CDBSidebarMenuItem>
                </NavLink>
            </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
                style={{
                padding: '20px 5px',
                }}
            >
                <NavLink exact to="/login" activeClassName="activeClicked" className="text-danger text-decoration-none">
                <CDBSidebarMenuItem icon="sign-out-alt" className="text-start">Logout</CDBSidebarMenuItem>
                </NavLink>
            </div>
            </CDBSidebarFooter>
        </CDBSidebar>
    );
};