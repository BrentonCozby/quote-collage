import React from 'react'

import './Menu.css'

const Menu = ({ goToLoginPage, logout, isLoggedIn, toggleMenu }) => (
    <div className="Menu">
        <h3 className="menu-title">Menu</h3>
        <span onClick={toggleMenu} className="menu-item">Item 1</span>
        <span onClick={toggleMenu} className="menu-item">Item 2</span>
        <span onClick={toggleMenu} className="menu-item">Item 3</span>
        <span
            className="login-logout-btn"
            onClick={(isLoggedIn)
                ? () => {toggleMenu(); logout()}
                : () => {toggleMenu(); goToLoginPage()}
            }
        >
                {(isLoggedIn) ? 'Logout' : 'Login'}
        </span>
    </div>
)

Menu.propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
    goToLoginPage: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    toggleMenu: React.PropTypes.func.isRequired
}

export default Menu
