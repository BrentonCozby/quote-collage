import React, {Component} from 'react'
import escape from 'escape-html'

import './QuoteEditor.css'

class QuoteEditor extends Component {

    static propTypes = {
        isEditingQuote: React.PropTypes.bool.isRequired,
        isAddingQuote: React.PropTypes.bool.isRequired,
        quotes: React.PropTypes.array.isRequired,
        quoteBeingEdited: React.PropTypes.object,
        editQuote: React.PropTypes.func.isRequired,
        addQuote: React.PropTypes.func.isRequired,
        closeQuoteEditor: React.PropTypes.func.isRequired
    }

    componentDidMount() {
        if(this.props.isEditingQuote) {
            this.quoteText.value = this.props.quoteBeingEdited.quoteText
            this.author.value = this.props.quoteBeingEdited.author
            this.quoteId = this.props.quoteBeingEdited.id
        }

        this.quoteText.focus()
    }

    saveNewQuote = (event) => {
        event.preventDefault();
        const quote = {
            quoteText: escape(this.quoteText.value),
            author: escape(this.author.value),
            id: this.quoteId || Date.now()
        }

        if(this.props.isAddingQuote) {
            this.props.addQuote(quote)
        }
        if(this.props.isEditingQuote) {
            this.props.editQuote(quote)
        }

        this.quoteForm.reset()
        this.props.closeQuoteEditor()
    }

    quoteTextRef = (input) => {this.quoteText = input}
    authorRef = (input) => {this.author = input}
    quoteFormRef = (form) => {this.quoteForm = form}

    render() {
        return (
            <div className="Quote-editor">
                <span onClick={this.props.closeQuoteEditor} className="close-btn">✘</span>
                <form
                    className="quote-editor-form"
                    ref={this.quoteFormRef}
                    onSubmit={this.saveNewQuote}>
                        <label htmlFor="form-quoteText">Quote</label>
                        <textarea
                            id="form-quoteText"
                            className="form-quoteText"
                            ref={this.quoteTextRef}
                            placeholder="To be, or not to be..."
                        />
                        <label htmlFor="form-author">Author</label>
                        <input
                            id="form-author"
                            className="form-author"
                            type="text"
                            ref={this.authorRef}
                            placeholder="William Shakespeare"
                        />
                        <button
                            className="form-button"
                            type="submit">
                                Save Quote
                        </button>
                </form>
            </div>
        )
    }
}

export default QuoteEditor
