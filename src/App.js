import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Archive from "./components/Archive.js"
import Single from "./components/Single.js"
import AddSingle from "./components/AddSingle.js"
import Menu from "./layout/Menu"

import "./App.css"

function App() {
    return (
        <div className="App">
            <Router>
                <Menu />
                <Switch>
                    <Route
                        exact
                        path="/:type/add"
                        render={props => <AddSingle {...props} />}
                    />
                    <Route
                        path="/:type/:id"
                        render={props => <Single {...props} />}
                    />
                    <Route
                        exact
                        path="/:type"
                        render={props => (
                            <Archive key="post-archive" {...props} />
                        )}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default App
