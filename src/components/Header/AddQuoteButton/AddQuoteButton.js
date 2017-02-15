import React from 'react'

import './AddQuoteButton.css'

const AddQuoteButton = ({ openQuoteEditor }) => (
    <span onClick={() => openQuoteEditor('Adding')} className="AddQuoteButton">+</span>
)

export default AddQuoteButton
