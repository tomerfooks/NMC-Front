import React from 'react'
import { useState } from 'react-router-dom'
const tomer = () => {
    const [fromData, setFormData] = {}
    const submit = e => {
        const key = e.target.name
    }

    return (
        <div className='Login'>
            <input
                type='email'
                placeholder='Enter Email'
                className='formField'
                name='email'
            ></input>
            <input
                type='password'
                placeholder='Enter Password'
                className='formField'
                name='password'
            ></input>
            <input className='formButtton' type='submit'>
                Submit
            </input>
        </div>
    )
}

export default tomer
