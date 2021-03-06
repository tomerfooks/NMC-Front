import React from 'react'
import { useState, useContext } from 'react'
import AppContext from '../AppContext'
import Cookie from 'js-cookie'
import { Redirect } from 'react-router-dom'

const Login = props => {
    const appContext = useContext(AppContext)
    console.log('appcontext', appContext)
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
                console.log('user-',user)
                Cookie.set('token', user.token)
                appContext.updateCurrentUser(user)
                return <Redirect to='/' />
            })
    }
    return (
        <div className='Login'>
            <form onSubmit={submit}>
                <input
                    type='email'
                    autoComplete='true'
                    placeholder='Enter Email'
                    className='formField'
                    name='email'
                />
                <input
                    type='password'
                    autoComplete='true'
                    placeholder='Enter Password'
                    className='formField'
                    name='password'
                />
                <input className='formButtton' value='submit' type='submit' />
            </form>
        </div>
    )
}

export default Login
