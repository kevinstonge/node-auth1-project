import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/Header.scss";
const Header = (props) => {
    return (
        <header>
            <h1>node-auth1-project</h1>
            <nav>
                {props.loggedIn ?
                    <NavLink to="/login" onClick={() => props.setLoggedIn(false)}>log out</NavLink> :
                    <>
                        <NavLink to="/login">login</NavLink>
                        <NavLink to="/register">register</NavLink>
                    </>}
            </nav>
        </header>
    )
}
export default Header;