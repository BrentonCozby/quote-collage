import React from 'react'

import './Login.css'

const Login = ({ title, message, authenticate, goToCollage }) => (
    <div className="Login container">
        <h2 className="login-title">{title}</h2>
        <p className="login-message">{message}</p>
        <div className="login-buttons">
            <button className="login-btn github" data-provider="github" onClick={authenticate}>GitHub Login</button>
            <button className="login-btn facebook" data-provider="facebook" onClick={authenticate}>Facebook Login</button>
            <button className="login-btn twitter" data-provider="twitter" onClick={authenticate}>Twitter Login</button>
            <button className="go-home" onClick={goToCollage}>Go Home</button>
        </div>
    </div>
)

Login.propTypes = {
    title: React.PropTypes.oneOf(['Login', 'Error']).isRequired,
    message: React.PropTypes.string.isRequired,
    authenticate: React.PropTypes.func.isRequired,
    goToCollage: React.PropTypes.func.isRequired
}

export default Login
