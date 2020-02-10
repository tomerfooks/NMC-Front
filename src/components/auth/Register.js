import React from 'react'
import { useState, useContext } from 'react'
import AppContext from '../AppContext'
import Cookie from 'js-cookie'
import { Redirect } from 'react-router-dom'

const Register = props => {
    const appContext = useContext(AppContext)
    const validateEmail = (email)=>{
        if(typeof email!=='string') return false
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const validatePassword = (password)=>{
        if(typeof password!=='string') return false
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        return re.test(String(password).toLowerCase());
    }
    const submit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const passwordVal = e.target.passwordVal.value
        if(!email||!password||!passwordVal){
            console.log('Please fill all required fields')
            return
        }
        if(password!==passwordVal) {
            console.log('Passwords are not matching')
            return
        }
        if(!validateEmail(email)) {
            console.log('Email is not valid. Please fix')
        return
        }
        if(!validatePassword(password)){
            console.log('Password needs to contain at least 1 special letter (like ! or $ or #) and at least 1 number. Please fix')
            return
        }
        const uri = 'http://localhost:4000/api/auth/register'
        const credentials = {
            email,
            password
        }
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token
            },
            body: JSON.stringify(credentials)
        }
        fetch(uri, options)
            .then(response => response.json())
            .then(user => {
                if(!user._id) {
                    console.log('Email is not unique')
                    return null
                }
                Cookie.set('token', user.token)
                appContext.updateCurrentUser(user)
            }).catch(err=>console.log(err))
    }
    return (
        <div className="Register">
            <form onSubmit={submit}>
                <input
                    type="email"
                    autoComplete="true"
                    placeholder="Enter Email"
                    className="formField"
                    name="email"
                />
                <input
                    type="password"
                    autoComplete="true"
                    placeholder="Enter Password"
                    className="formField"
                    name="password"
                />
                <input
                    type="password"
                    autoComplete="true"
                    placeholder="Enter Password Again"
                    className="formField"
                    name="passwordVal"
                />
                {appContext.currentUser.role === 'admin' ? (
                    <select>
                        <option selected disabled>Choose Role</option>
                        { appContext.appSettings.settings.roles.map(role=>
                           <option value={role}>{role}</option>
                    )}
                    </select>
            
                ) : null}
                <input className="formButtton" value="Register" type="submit" />
            </form>
        </div>
    )
}

export default Register
