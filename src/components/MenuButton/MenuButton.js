import React from 'react'

import './MenuButton.css'

const MenuButton = ({ isMenuOpen, toggleMenu }) => (
    <div onClick={toggleMenu} className={(isMenuOpen) ? "Menu-button open" : "Menu-button"}>
        <span className="menu-button-line top"></span>
        <span className="menu-button-line middle"></span>
        <span className="menu-button-line bottom"></span>
    </div>
)

export default MenuButton
