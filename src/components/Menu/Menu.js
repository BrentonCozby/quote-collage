import React from 'react'

import './Menu.css'

const Menu = ({ isMenuOpen, goToLoginPage, logout, isLoggedIn, toggleMenu }) => (
    <div className={(isMenuOpen) ? "Menu open" : "Menu"}>
        <h3 className="menu-title">Menu</h3>
        <span onClick={toggleMenu} className="menu-item">Item 1</span>
        <span onClick={toggleMenu} className="menu-item">Item 2</span>
        <span onClick={toggleMenu} className="menu-item">Item 3</span>
        <button
            className="login-logout-btn"
            onClick={(isLoggedIn)
                ? () => {toggleMenu(); logout()}
                : () => {toggleMenu(); goToLoginPage()}
            }
        >
                {(isLoggedIn) ? 'Logout' : 'Login'}
        </button>
    </div>
)

export default Menu
