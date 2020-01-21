import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Cookie from 'js-cookie'

//// M A IN
import Header from './components/Header'
import Archive from './components/Archive.js'
import Single from './components/Single.js'

/// A U T H
import Login from './components/auth/Login'
import AuthContext from './components/AuthContext'

/// C R U D
import CreateNewObject from './components/CreateNewObject'

/// D E S I G N
import './styles/App.scss'

function App() {
    const [currentUser, setCurrentUser] = useState({
        email: '',
        id: '',
        token: null
    })

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
        <div className="App">
            <AuthContext.Provider value={{ currentUser, updateCurrentUser }}>
                <AuthContext.Consumer>
                    {user => (
                        <Router>
                            <Header></Header>
                            <Switch>
                                <Route
                                    exact
                                    path="/login"
                                    render={props => (
                                        <Login
                                            currentUser={{
                                                currentUser,
                                                updateCurrentUser
                                            }}
                                            {...props}
                                        />
                                    )}
                                ></Route>
                                <Route
                                    exact
                                    path="/create/:type"
                                    render={props => (
                                        <CreateNewObject
                                            currentUser={currentUser}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/:type"
                                    render={props => (
                                        <Archive
                                            currentUser={currentUser}
                                            {...props}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/:type/:id"
                                    render={props => <Single {...props} />}
                                />
                            </Switch>
                        </Router>
                    )}
                </AuthContext.Consumer>
            </AuthContext.Provider>
        </div>
    )
}

export default App
