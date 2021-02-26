
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Form, Button, Alert } from 'react-bootstrap';
import './menubar.css'
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

class MenuBar extends Component {
    componentDidMount() {
        const isLoggedIn = localStorage.getItem('user');
        if (isLoggedIn === 'Sohan') {
            this.props.history.push(`/home`);
        } else {
            this.props.history.push(`/`);
        }
    }

    handleLogout = () => {
        localStorage.removeItem('user');
        this.props.history.push(`/`);
    }
    render() {
        const { loggedInUserInfo } = this.props;
        return (
            <ProSidebar>
                <SidebarHeader>
                    <div className="menuLogo">
                        Insta Maal <br />

                    </div>
                    <div className="text-muted username">
                        Welcome, {loggedInUserInfo.distributorName}
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                        <MenuItem><Link exact to="/home" className="menuItem">Home</Link></MenuItem>
                        <MenuItem><Link to="/orders" className="menuItem">Orders</Link></MenuItem>
                        <MenuItem><Link to="/products" className="menuItem">Products</Link></MenuItem>
                        <MenuItem><Link className="menuItem">Manage</Link></MenuItem>
                        <MenuItem><Link className="menuItem">Accounts</Link></MenuItem>
                        <MenuItem><Link onClick={this.handleLogout} className="menuItem">Logout</Link></MenuItem>
                    </Menu>
                </SidebarContent>
                <SidebarFooter>
                </SidebarFooter>
            </ProSidebar>
        )
    }
}

export default withRouter(MenuBar);