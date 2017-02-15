import React, { Component } from 'react'
import base from '../../base'
import defaultQuotes from '../../default-quotes'

import './Login.css'

class Login extends Component {

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
        if(err) return console.error(err)

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
                if(snapshot.val()) {
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
            <nav className="Login">
                <h2>Login</h2>
                <p>Sign-in to manage your quotes</p>
                <button className="github" data-provider="github" onClick={this.authenticate}>Log In with GitHub</button>
                <button className="facebook" data-provider="facebook" onClick={this.authenticate}>Log In with Facebook</button>
                <button className="twitter" data-provider="twitter" onClick={this.authenticate}>Log In With Twitter</button>
            </nav>
        )
    }
}

export default Login
