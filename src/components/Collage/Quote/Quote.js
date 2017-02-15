import React, { Component } from 'react'

import './Quote.css'

class Quote extends Component {
    state = {
        menuIsOpen: false
    }

    showCRUDbuttons = () => {
        const menuIsOpen = this.state.menuIsOpen
        this.setState({ menuIsOpen: !menuIsOpen })
    }

    deleteQuote = () => {
        this.props.deleteQuote(this.props.quoteId)
        this.setState({ menuIsOpen: false })
    }

    editQuote = () => {
        this.props.openQuoteEditor('Editing', this.props.quoteId)
        this.setState({ menuIsOpen: false })
    }

    render() {
        const menuIsOpen = this.state.menuIsOpen
        return (
            <div className="Quote">
                <span className="quote-text">{ this.props.quoteText }</span>
                <div className="quote-bottom-row">
                    <span
                        className="quote-gear-btn"
                        title="quote settings"
                        onClick={this.showCRUDbuttons}>
                            ⚙
                    </span>
                    <div className={(menuIsOpen) ? 'quote-CRUD-buttons animate' : 'quote-CRUD-buttons'}>
                        <span
                            className={(menuIsOpen) ? 'quote-delete-btn animate' : 'quote-delete-btn'}
                            title="delete quote"
                            onClick={this.deleteQuote}>
                                ✗
                        </span>
                        <span
                            className={(menuIsOpen) ? 'quote-edit-btn animate' : 'quote-edit-btn'}
                            title="edit quote"
                            onClick={this.editQuote}>
                                ✎
                        </span>
                    </div>
                    <span className="quote-author">{ this.props.author }</span>
                </div>
            </div>
        )
    }
}

export default Quote
