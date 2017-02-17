import React, {Component} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Overlay from '../Overlay/Overlay.js'
import MenuButton from '../MenuButton/MenuButton.js'
import Menu from '../Menu/Menu.js'
import Header from '../Header/Header.js'
import LoginContainer from '../../containers/Login-container'
import Collage from '../Collage/Collage.js'
import QuoteEditor from '../QuoteEditor/QuoteEditor.js'
import Footer from '../Footer/Footer.js'

import './App.css'
import '../../css/animations.css'

class App extends Component {
    state = {
        isLoginShown: false,
        isAddingQuote: false,
        isEditingQuote: false,
        isMenuOpen: false,
        quoteBeingEdited: null
    }

    static propTypes = {
        userId: React.PropTypes.string,
        username: React.PropTypes.string,
        quotes: React.PropTypes.array,
        isLoggedIn: React.PropTypes.bool,
        deleteQuote: React.PropTypes.func,
        editQuote: React.PropTypes.func,
        addQuote: React.PropTypes.func,
        login: React.PropTypes.func,
        logout: React.PropTypes.func
    }

    goToLoginPage = () => {
        this.setState({ isLoginShown: true })
    }

    goToCollage = () => {
        this.setState({ isLoginShown: false })
    }

    login = (userData, authId) => {
        this.props.login(userData, authId);
        this.setState({ isLoginShown: false })
    }

    logout = () => {
        this.props.logout();
        this.setState({ isLoginShown: true })
    }

    openQuoteEditor = (operation, quoteId) => {
        var newState = {[`is${operation}Quote`]: !this.state[`is${operation}Quote`]}

        if(quoteId) {
            newState.quoteBeingEdited =
                this.props.quotes.find(q => q.id === quoteId)
        }

        this.setState(newState);
    }

    closeQuoteEditor = () => {
        this.setState({
            isAddingQuote: false,
            isEditingQuote: false
        })
    }

    editQuote = (quote) => {
        this.props.editQuote(quote);
        this.setState({ quoteBeingEdited: null })
    }

    renderMenu = () => (
        <Menu
            key="menu"
            isMenuOpen={this.state.isMenuOpen}
            isLoggedIn={this.props.isLoggedIn}
            goToLoginPage={this.goToLoginPage}
            logout={this.logout}
            toggleMenu={this.toggleMenu}
        />
    )

    renderLogin = () => {
        return (
            <LoginContainer
                key="login"
                userId={this.props.userId}
                login={this.login}
                goToCollage={this.goToCollage}
            />
        )
    }

    renderCollage = () => {
        if(this.props.userId === 'user not found') return <p>User Not Found</p>
        return (
            <Collage
                key="collage"
                quotes={this.props.quotes}
                deleteQuote={this.props.deleteQuote}
                openQuoteEditor={this.openQuoteEditor}
                username={this.props.username}
            />
        )
    }

    renderQuoteEditor = () => {
        return (
            <QuoteEditor
                key="quote-editor"
                isEditingQuote={this.state.isEditingQuote}
                isAddingQuote={this.state.isAddingQuote}
                quotes={this.props.quotes}
                quoteBeingEdited={this.state.quoteBeingEdited}
                editQuote={this.editQuote}
                addQuote={this.props.addQuote}
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
                <Header
                    goToCollage={this.goToCollage}
                    openQuoteEditor={this.openQuoteEditor}
                />

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {
                        (this.state.isEditingQuote ||
                         this.state.isAddingQuote ||
                         this.state.isMenuOpen) &&
                        <Overlay key="overlay" hideOverlayThings={this.hideOverlayThings} />
                    }
                    {(this.state.isEditingQuote || this.state.isAddingQuote) && this.renderQuoteEditor()}
                    {(this.state.isLoginShown) ? this.renderLogin() : this.renderCollage()}
                </ReactCSSTransitionGroup>

                <MenuButton toggleMenu={this.toggleMenu} isMenuOpen={this.state.isMenuOpen} />

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="menu"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}>
                    {this.state.isMenuOpen && this.renderMenu()}
                </ReactCSSTransitionGroup>

                <Footer />
            </div>
        )
    }
}

export default App
