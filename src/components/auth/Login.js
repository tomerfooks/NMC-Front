import React from 'react'
import { useState } from 'react'
import AuthContext from '../AuthContext'
import Cookie from 'js-cookie'

const Login = props => {
    const [fromData, setFormData] = useState({})
    const submit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const uri = 'http://localhost:4000/api/auth/login'
        const credentials = {
            email,
            password
        }
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        fetch(uri, options)
            .then(response => response.json())
            .then(user => {
                Cookie.set('token', user.token)
                props.currentUser.updateCurrentUser(user)
            })
    }
    return (
        <div className="Login">
            <form onSubmit={submit}>
                <input
                    type="email"
                    autoComplete="true"
                    placeholder="Enter Email"
                    className="formField"
                    name="email"
                    value="tom@fooks.co.il"
                />
                <input
                    type="password"
                    value="tomer123"
                    autoComplete="true"
                    placeholder="Enter Password"
                    className="formField"
                    name="password"
                />
                <input className="formButtton" value="submit" type="submit" />
            </form>
        </div>
    )
}

export default Login
