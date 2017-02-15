import React, {Component} from 'react'
import base from './base'
import defaultQuotes from './default-quotes'

import Overlay from './components/Overlay/Overlay.js'
import MenuButton from './components/MenuButton/MenuButton.js'
import Menu from './components/Menu/Menu.js'
import Header from './components/Header/Header.js'
import Login from './components/Login/Login.js'
import Collage from './components/Collage/Collage.js'
import QuoteEditor from './components/QuoteEditor/QuoteEditor.js'
import Footer from './components/Footer/Footer.js'

import './App.css'

class App extends Component {
    state = {
        userId: this.props.match.params.userId || null,
        quotes: [],
        showLogin: false,
        isLoggedIn: false,
        isAddingQuote: false,
        isEditingQuote: false,
        isMenuOpen: false,
        quoteBeingEdited: null
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

    goToLoginPage = () => {
        this.setState({ showLogin: true })
    }

    goToCollage = () => {
        this.setState({ showLogin: false })
    }

    login = (userData, authId) => {
        this.setState({
            isLoggedIn: true,
            userId: authId,
            quotes: userData.quotes,
            showLogin: false
        })
    }

    logout = (newState) => {
        base.removeBinding(this.ref) || delete this.ref
        base.unauth()

        this.setState({
            isLoggedIn: false,
            showLogin: false,
            quotes: defaultQuotes,
            userId: null
        })
        this.props.push('/')
    }

    openQuoteEditor = (operation, quoteId) => {
        var newState = {[`is${operation}Quote`]: !this.state[`is${operation}Quote`]}

        if(quoteId) {
            newState.quoteBeingEdited =
                this.state.quotes.find(q => q.id === quoteId)
        }

        this.setState(newState);
    }

    closeQuoteEditor = () => {
        this.setState({
            isAddingQuote: false,
            isEditingQuote: false
        })
    }

    addQuote = (quote) => {
        var quotes = this.state.quotes.map(quote => {
            return Object.assign(quote)
        })

        quotes.push(quote)

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

        this.setState({ quotes, quoteBeingEdited: null })
    }

    renderLogin = () => {
        return (
            <Login
                userId={this.state.userId}
                login={this.login}
            />
        )
    }

    renderCollage = () => {
        if(this.state.userId === 'user not found') return <p>User Not Found</p>
        return (
            <Collage
                quotes={this.state.quotes}
                deleteQuote={this.deleteQuote}
                openQuoteEditor={this.openQuoteEditor}
            />
        )
    }

    renderQuoteEditor = () => {
        return (
            <QuoteEditor
                isEditingQuote={this.state.isEditingQuote}
                isAddingQuote={this.state.isAddingQuote}
                quotes={this.state.quotes}
                quoteBeingEdited={this.state.quoteBeingEdited}
                editQuote={this.editQuote}
                addQuote={this.addQuote}
                closeQuoteEditor={this.closeQuoteEditor}
            />
        )
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    hideOverlayThings = () => {
        this.setState({
            isEditingQuote: false,
            isAddingQuote: false,
            isMenuOpen: false
        })
    }

    render() {
        return (
            <div className="App">
                {
                    (this.state.isEditingQuote ||
                     this.state.isAddingQuote ||
                     this.state.isMenuOpen)
                    ? <Overlay hideOverlayThings={this.hideOverlayThings} />
                    : null
                }
                <MenuButton toggleMenu={this.toggleMenu} isMenuOpen={this.state.isMenuOpen} />
                <Menu
                    isMenuOpen={this.state.isMenuOpen}
                    isLoggedIn={this.state.isLoggedIn}
                    goToLoginPage={this.goToLoginPage}
                    logout={this.logout}
                    toggleMenu={this.toggleMenu}
                />
                <Header
                    goToCollage={this.goToCollage}
                    openQuoteEditor={this.openQuoteEditor}
                />
                { (this.state.showLogin) ? this.renderLogin() : this.renderCollage() }
                {(this.state.isEditingQuote || this.state.isAddingQuote) ? this.renderQuoteEditor() : null}
                <Footer />
            </div>
        )
    }
}

export default App
