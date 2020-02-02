import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookie from 'js-cookie'

//// M A IN
import Header from './components/Header'
import Archive from './components/Archive.js'
import Single from './components/Single.js'

/// A U T H
import Login from './components/auth/Login'
import AppContext from './components/AppContext'

/// C R U D
import CreateObject from './components/admin/CreateObject'
import UpdateObject from './components/admin/UpdateObject'

/// D E S I G N
import './styles/App.scss'

function App() {
    const [currentUser, setCurrentUser] = useState({
        email: '',
        id: '',
        token: null
    })
    const logout = () => {
        Cookie.remove('token')
        setCurrentUser({})
    }
    const checkAuth = () => {
        function parseJwt(token) {
            var base64Url = token.split('.')[1]
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            var jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(function(c) {
                        return (
                            '%' +
                            ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        )
                    })
                    .join('')
            )

            return JSON.parse(jsonPayload)
        }
        if (Cookie.get('token')) {
            const loggedUser = parseJwt(Cookie.get('token'))
            setCurrentUser({
                email: loggedUser.email,
                id: loggedUser._id,
                role: loggedUser.role,
                token: Cookie.get('token')
            })
        }
    }

    const updateCurrentUser = freshlyLoggedUser =>
        setCurrentUser(freshlyLoggedUser)

    useEffect(() => {
        if (currentUser.token === null) checkAuth()
        else console.log('Current Logged User: ', currentUser)
    })
    return (
        <div className='appContainer'>
            <AppContext.Provider value={{ currentUser, updateCurrentUser }}>
                <AppContext.Consumer>
                    {user => (
                        <Router>
                            <Header></Header>
                            <Switch>
                                <Route
                                    exact
                                    path='/login'
                                    render={props => <Login {...props} />}
                                ></Route>
                                <Route
                                    exact
                                    path='/:objectType'
                                    render={props => <Archive {...props} />}
                                />
                                <Route
                                    exact
                                    path='/create/:objectType'
                                    render={props => (
                                        <CreateObject {...props} />
                                    )}
                                />
                                <Route
                                    exact
                                    path='/update/:objectType/:id'
                                    render={props => (
                                        <UpdateObject {...props} />
                                    )}
                                />
                                <Route
                                    exact
                                    path='/:objectType/:id'
                                    render={props => <Single {...props} />}
                                />
                            </Switch>
                        </Router>
                    )}
                </AppContext.Consumer>
            </AppContext.Provider>
        </div>
    )
}

export default App
