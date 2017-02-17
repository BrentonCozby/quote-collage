import React from 'react'

import './AddQuoteButton.css'

const AddQuoteButton = ({ openQuoteEditor }) => (
    <span onClick={() => openQuoteEditor('Adding')} className="AddQuoteButton">+</span>
)

AddQuoteButton.propTypes = {
    openQuoteEditor: React.PropTypes.func.isRequired
}

export default AddQuoteButton
