import React, { Component } from 'react'
import base from '../../base'
import defaultQuotes from '../../default-quotes'

import './Login.css'

class Login extends Component {

    state = {
        title: "Login",
        message: "Sign-in to manage your quotes"
    }

    static propTypes = {
        userId: React.PropTypes.string,
        authId: React.PropTypes.string,
        login: React.PropTypes.func.isRequired
    }

    componentWillMount() {
        base.onAuth((user) => {
            if(user) {
                this.authHandler(null, { user })
            }
        })
    }

    authenticate = (event) => {
        const provider = event.target.dataset.provider
        base.authWithOAuthPopup(provider, this.authHandler)
    }

    authHandler = (err, authData) => {
        if(err) {
            if(err.code === "auth/account-exists-with-different-credential") {
                this.setState({
                    title: "Error",
                    message: `An account already exists with the email: ${err.email}`
                })
            }
            return console.error(err)
        }

        // login method from App component
        const login = this.props.login

        Promise.resolve(base.database().ref('users'))
        .then(usersRef => {
            usersRef.once('value', snapshot => {
                const data = snapshot.val() || {}

                if(!data[authData.user.uid]) {
                    base.database().ref('users/' + authData.user.uid).set({
                        quotes: [...defaultQuotes],
                        name: authData.user.displayName
                    })
                }
            })
            .then(snapshot => {
                if(snapshot.val() && snapshot.val()[authData.user.uid]) {
                    login(snapshot.val()[authData.user.uid], authData.user.uid)
                }
                // if new user is created, another snapshot is required to get new data
                else {
                    usersRef.once('value', snapshot => {
                        login(snapshot.val()[authData.user.uid], authData.user.uid)
                    })
                }
            })
        })
    }

    render() {
        return (
            <div className="Login container">
                <h2 className="login-title">{this.state.title}</h2>
                <p className="login-message">{this.state.message}</p>
                <div className="login-buttons">
                    <button className="login-btn github" data-provider="github" onClick={this.authenticate}>GitHub Login</button>
                    <button className="login-btn facebook" data-provider="facebook" onClick={this.authenticate}>Facebook Login</button>
                    <button className="login-btn twitter" data-provider="twitter" onClick={this.authenticate}>Twitter Login</button>
                </div>
            </div>
        )
    }
}

export default Login
