import React from 'react'

import Quote from './Quote/Quote.js'

import './Collage.css'

const Collage = ({ quotes, deleteQuote, editQuote, openQuoteEditor, username }) => (
    <div className="container">
        {username && <h2 className="username">{username}'s Quotes</h2>}
        <div className="Collage">
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
        </div>
    </div>
)

export default Collage
