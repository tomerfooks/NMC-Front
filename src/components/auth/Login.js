import React from 'react'
import { useState } from 'react'
const Login = () => {
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
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(credentials)
        }
        fetch(uri, options, data => {
            console.log('what?')
        })
            .then(data => {
                console.log(data.json())
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='Login'>
            <form onSubmit={submit}>
                <input
                    type='email'
                    placeholder='Enter Email'
                    className='formField'
                    name='email'
                />
                <input
                    type='password'
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
