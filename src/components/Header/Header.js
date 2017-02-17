import React from 'react'

import AddQuoteButton from './AddQuoteButton/AddQuoteButton.js'

import './Header.css'

const Header = ({ openQuoteEditor, goToCollage }) => (
    <div className="Header">
        <AddQuoteButton openQuoteEditor={openQuoteEditor} />
        <h1 onClick={goToCollage} className="title">Quote Collage</h1>
    </div>
)

Header.propTypes = {
    openQuoteEditor: React.PropTypes.func.isRequired,
    goToCollage: React.PropTypes.func.isRequired
}

export default Header
