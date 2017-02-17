import React, { Component } from 'react'
import base from '../base'
import defaultQuotes from '../default-quotes'

import App from '../components/App/App.js'

class AppContainer extends Component {
    state = {
        userId: this.props.match.params.userId || null,
        username: null,
        quotes: [],
        isLoggedIn: false
    }

    componentWillMount() {
        if(this.state.userId === null) {
            return this.setState({ isLoggedIn: false, quotes: [...defaultQuotes] })
        }

        const App = this
        console.log('will mount');

        if(this.state.isLoggedIn === false) {
            base.fetch(`users/${this.state.userId}`, { context: App })
            .then(data => {
                // if userId not found, tell the user
                if(data === null) return App.setState({ userId: 'user not found' })

                if(this.state.isLoggedIn === false) {
                    App.setState({ quotes: data.quotes })
                }
            })
        }
    }

    componentWillUnmount() {
        if(this.ref) {
            base.removeBinding(this.ref)
        }
    }

    componentDidUpdate() {
        if(this.state.isLoggedIn && !this.ref) {
            this.ref = base.syncState(`users/${this.state.userId}/quotes`, {
                context: this,
                state: 'quotes',
                asArray: true
            })
        }
    }

    login = (userData, authId) => {
        this.setState({
            isLoggedIn: true,
            quotes: userData.quotes,
            userId: authId,
            username: userData.name
        })
    }

    logout = () => {
        base.removeBinding(this.ref) || delete this.ref
        base.unauth()

        this.setState({
            isLoggedIn: false,
            quotes: defaultQuotes,
            userId: null,
            username: null
        })
    }

    addQuote = (quote) => {
        var quotes = this.state.quotes.map(quote => {
            return Object.assign(quote)
        })

        quotes.unshift(quote)

        this.setState({ quotes })
    }

    deleteQuote = (quoteId) => {
        const quotes = [...this.state.quotes]
        const quoteToDelete = quotes.find(quote => quote.id === quoteId)
        const quoteIndex = quotes.indexOf(quoteToDelete)

        quotes.splice(quoteIndex, 1)

        this.setState({ quotes })
    }

    editQuote = (quote) => {
        const quotes = [...this.state.quotes]
        const quoteToEdit = quotes.find(q => q.id === quote.id)
        const quoteIndex = quotes.indexOf(quoteToEdit)

        quotes[quoteIndex].quoteText = quote.quoteText
        quotes[quoteIndex].author = quote.author

        this.setState({ quotes })
    }

    render() {
        return (
            <App
                userId={this.state.userId}
                username={this.state.username}
                quotes={this.state.quotes}
                isLoggedIn={this.state.isLoggedIn}
                deleteQuote={this.deleteQuote}
                editQuote={this.editQuote}
                addQuote={this.addQuote}
                login={this.login}
                logout={this.logout}
            />
        )
    }
}

export default AppContainer
