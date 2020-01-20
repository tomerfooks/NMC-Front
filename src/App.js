import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import authContext from './components/authContext'

//// M A IN
import Archive from './components/Archive.js'
import Single from './components/Single.js'
import Menu from './components/Menu'
import AuthContext from './AuthContext'
/// A U T H
import Login from './components/auth/Login'

/// D E S I G N
import './App.scss'

function App() {
    const [user, setUser] = useState({})
    const AuthContext = React.createContext({ tomer: 'name' })

    useEffect(() => {
        setUser({ email: 'bla', pass: 'asdasd' })
    }, [])

    return (
        <authContext.Provider value='tomer'>
            <div className='App'>
                <Router>
                    <Menu />
                    <Switch>
                        <Route
                            exact
                            path='/:type'
                            render={props => (
                                <Archive key='post-archive' {...props} />
                            )}
                        />

                        <Route
                            exact
                            path='/login'
                            render={props => <Login></Login>}
                        ></Route>
                        <authContext.Consumer>
                            {value => {
                                return (
                                    <Route
                                        path='/:type/:id'
                                        render={props => <Single {...props} />}
                                    />
                                )
                            }}
                        </authContext.Consumer>
                    </Switch>
                </Router>
            </div>
        </authContext.Provider>
    )
}

export default App
