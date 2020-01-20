import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'

//// M A IN
import Header from './components/Header'
import Archive from './components/Archive.js'
import Single from './components/Single.js'

/// A U T H
import Login from './components/auth/Login'

/// C O N T E X T   F O R   G L O B A L    D A T A
import AuthContext from './components/AuthContext'

/// D E S I G N
import './styles/App.scss'

function App() {
    const [currentUser, setCurrentUser] = useState({
        email: '',
        id: '',
        token: null
    })
    useEffect(() => {
        if (Object.keys(currentUser).length === 0)
            setCurrentUser({ email: 'bla', id: 123, token: 'tokena' })
    })

    return (
        <div className="App">
            <AuthContext.Provider value={currentUser}>
                <AuthContext.Consumer>
                    {user => (
                        <Router>
                            <Header></Header>
                            <Switch>
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
                                <Route
                                    exact
                                    path="/login"
                                    render={props => <Login {...props} />}
                                ></Route>
                            </Switch>
                        </Router>
                    )}
                </AuthContext.Consumer>
            </AuthContext.Provider>
        </div>
    )
}

export default App
