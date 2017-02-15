import React from 'react'

import Quote from './Quote/Quote.js'

import './Collage.css'

const Collage = ({ quotes, deleteQuote, editQuote, openQuoteEditor }) => (
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
)

export default Collage
