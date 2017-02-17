import React, { Component } from 'react'
import base from '../base'
import defaultQuotes from '../default-quotes'

import Login from '../components/Login/Login.js'

class LoginContainer extends Component {

    state = {
        title: "Login",
        message: "Sign-in to manage your quotes"
    }

    static propTypes = {
        userId: React.PropTypes.string,
        login: React.PropTypes.func.isRequired,
        goToCollage: React.PropTypes.func.isRequired
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
            <Login
                title={this.state.title}
                message={this.state.message}
                authenticate={this.authenticate}
                goToCollage={this.props.goToCollage}
            />
        )
    }

}

export default LoginContainer
