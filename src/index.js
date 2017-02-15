import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import NotFound from './NotFound/NotFound.js'

import './normalize.css'
import './index.css'

const Root = () => (
    <Router basename='/projects/quote-collage'>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path='/:userId' component={App}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root/>, document.getElementById('root'))
