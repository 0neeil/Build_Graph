import React, { useContext } from "react";
import { Context } from "..";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, ADMIN_ROUTE, GRAPHIC_ROUTE } from "../utils/consts";
import "./NavBar.css";
import { getAllUsers } from "../http/adminAPI";


const NavBar = observer(() => {
    const {user} = useContext(Context);

    return (
        <Navbar className="navbar">
            <div className="nav-container d-flex justify-content-between">
                <NavLink className="logo" to={MAIN_ROUTE}>
                    <span className="logo1">BUILD</span>
                    <span className="logo2">GRAPH</span>  
                </NavLink>

                <Nav className="ms-auto">
                {user.isAdmin === true && 
                    <NavLink to={ADMIN_ROUTE}>
                        <Button className="button me-2" onClick={async ()=>{
                            await getAllUsers()
                        }}>Admin menu</Button>
                    </NavLink>
                }
                
                {user.isAuth ? 
                    <Nav className="ms-auto">
                        <NavLink to={GRAPHIC_ROUTE}>
                            <Button className="button">Graph</Button>
                        </NavLink>
                        <NavLink to={PROFILE_ROUTE}>
                            <Button data-testid="profile-button" className="button ms-2">Profile</Button>
                        </NavLink>
                        <NavLink to={LOGIN_ROUTE}>
                            <Button onClick={() => {
                                user.setIsAuth(false);
                                user.setIsAdmin(false);
                                user.setIsReg(true);
                                localStorage.clear()
                            }} className="button ms-2" >Log out</Button>
                        </NavLink>
                    </Nav>
                    : 
                    <Nav className="ms-auto">
                        <NavLink to={REGISTRATION_ROUTE}>
                            <Button onClick={() => user.setIsReg(false)} className="button">Sign Up</Button>
                        </NavLink>
                        <NavLink to={LOGIN_ROUTE}>
                            <Button onClick={() => user.setIsReg(true)} className="button ms-2" >Log In</Button>
                        </NavLink>
                    </Nav>
                }
                </Nav>
            </div>
        </Navbar>
    );
});

export default NavBar;