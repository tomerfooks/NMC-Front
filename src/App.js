import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//// M A IN
import Archive from './components/Archive.js'
import Single from './components/Single.js'
import Menu from './components/Menu'

/// A U T H
import Login from './components/auth/Login'

/// D E S I G N
import './App.scss'

function App() {
    return (
        <div className='App'>
            <Router>
                <Menu />
                <Switch>
                    <Route
                        path='/:type/:id'
                        render={props => <Single {...props} />}
                    />
                    <Route
                        exact
                        path='/:type'
                        render={props => (
                            <Archive key='post-archive' {...props} />
                        )}
                    />
                    <Route
                        exact
                        path='/auth/login'
                        render={props => Login}
                    ></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
