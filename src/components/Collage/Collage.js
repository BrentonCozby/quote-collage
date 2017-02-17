import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Quote from './Quote/Quote.js'

import './Collage.css'
import '../../css/animations.css'

const Collage = ({ quotes, deleteQuote, editQuote, openQuoteEditor, username }) => (
    <div className="container">
        {username && <h2 className="username">{username}'s Quotes</h2>}
        <div className="Collage">
            <ReactCSSTransitionGroup
                component="div"
                transitionName="fadeIn"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {quotes.map(quote => (
                    <Quote
                        key={quote.id}
                        quoteId={quote.id}
                        quoteText={quote.quoteText}
                        author={quote.author}
                        deleteQuote={deleteQuote}
                        openQuoteEditor={openQuoteEditor}
                    />
                ))}
            </ReactCSSTransitionGroup>
        </div>
    </div>
)

Collage.propTypes = {
    quotes: React.PropTypes.array.isRequired,
    deleteQuote: React.PropTypes.func.isRequired,
    openQuoteEditor: React.PropTypes.func.isRequired,
    username: React.PropTypes.string
}

export default Collage
