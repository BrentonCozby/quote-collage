import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AppContainer from './containers/App-container'
import NotFound from './components/NotFound/NotFound.js'

import './normalize.css'
import './index.css'

const Root = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={AppContainer}/>
            <Route exact path='/:userId' component={AppContainer}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

ReactDOM.render(<Root/>, document.getElementById('root'))
