import React from 'react'

import './Overlay.css'

const Overlay = ({ hideOverlayThings }) => (
    <div onClick={hideOverlayThings} className="Overlay"></div>
)

export default Overlay
