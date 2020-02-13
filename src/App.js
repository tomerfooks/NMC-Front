import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Cookie from 'js-cookie'

/// M A I N
import AppContext from './components/AppContext'
import Header from './components/Header'
import SideBar from './components/SideBar'

/// O B J E C T S
import Archive from './components/Archive.js'
import Single from './components/Single.js'

/// A U T H
import Login from './components/auth/Login'
import Register from './components/auth/Register'

/// A D M I N
import Media from './components/admin/Media'

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
  const [appSettings, setAppSettings] = useState({})
  const getAppSettings = () => {
    if (typeof appSettings.settings !== 'undefined') return
    fetch(`http://localhost:4000/api/settings`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response =>
      response
        .json()
        .then(settings => {
          fetch(`http://localhost:4000/api/schemas`, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(response =>
            response.json().then(schemas => {
              setAppSettings({ settings, schemas })
            })
          )
        })
        .catch(err => console.log('Error with getting app settings.. ', err))
    )
  }
  const abortController = new AbortController()

  const checkAuth = () => {
    function parseJwt(token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      var jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )

      return JSON.parse(jsonPayload)
    }
    if (Cookie.get('token') && Cookie.get('token') !== 'undefined') {
      console.log('token', Cookie.get('token'))
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
    getAppSettings()
    if (currentUser.token === null) checkAuth()
    else console.log('Current Logged User: ', currentUser)
    return () => {
      abortController.abort()
    }
  }, [currentUser])

  return typeof appSettings.settings !== 'undefined' ? (
    <div className='appContainer'>
      <AppContext.Provider
        value={{
          currentUser,
          updateCurrentUser,
          appSettings
        }}>
        <AppContext.Consumer>
          {() => (
            <Router>
              <Header></Header>
              <div className='Body'>
                <SideBar></SideBar>
                <div className='Content'>
                  <Switch>
                    <Route
                      exact
                      path='/login'
                      render={props => <Login {...props} />}></Route>
                    <Route
                      exact
                      path='/media'
                      render={props => <Media {...props} />}></Route>
                    <Route
                      exact
                      path='/register'
                      render={props => <Register {...props} />}></Route>
                    <Route
                      exact
                      path='/:objectType'
                      render={props => <Archive {...props} />}
                    />
                    <Route
                      exact
                      path='/create/:objectType'
                      render={props => <CreateObject {...props} />}
                    />
                    <Route
                      exact
                      path='/update/:objectType/:id'
                      render={props => <UpdateObject {...props} />}
                    />
                    <Route
                      exact
                      path='/:objectType/:id'
                      render={props => <Single {...props} />}
                    />
                  </Switch>
                </div>
              </div>
            </Router>
          )}
        </AppContext.Consumer>
      </AppContext.Provider>
    </div>
  ) : null
}

export default App
