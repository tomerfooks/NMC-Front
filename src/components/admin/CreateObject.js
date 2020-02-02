import React from 'react'
import { useState } from 'react'
import AppContext from '../AppContext'
import Cookie from 'js-cookie'

const CreateObject = props => {
    const submit = e => {
        e.preventDefault()
        const newObject = {
            title: e.target.title.value,
            status: e.target.status.value,
            content: e.target.content.value
        }
        const uri = 'http://localhost:4000/api/create/post'
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: props.currentUser.token
            },
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify(newObject)
        }
        fetch(uri, options)
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
    }
    return (
        <div className='CreateObject'>
            <form onSubmit={submit}>
                <input
                    type='text'
                    autoComplete='true'
                    placeholder='Enter Title'
                    className='formField'
                    name='title'
                />
                <input
                    type='text'
                    autoComplete='true'
                    placeholder='Enter The Main Content'
                    className='formField'
                    name='content'
                />
                <select name='status'>
                    <option value='pending'>Pending</option>
                    <option value='active'>Active</option>
                    <option value='draft'>Draft</option>
                </select>
                <input className='formButtton' value='submit' type='submit' />
            </form>
        </div>
    )
}

export default CreateObject
