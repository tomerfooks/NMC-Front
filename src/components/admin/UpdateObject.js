import React from 'react'
import { useState, useEffect } from 'react'
import AppContext from '../AppContext'

const CreateObject = props => {
    const { objectType, id } = props.match.params
    const [form, setForm] = useState([])

    const generateForm = () => {
        fetch(`http://localhost:4000/api/get/${objectType}/${id}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
    }

    const submit = e => {
        e.preventDefault()
        const uri = 'http://localhost:4000/api/update/post/'
        const options = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: props.currentUser.token
            },
            mode: 'cors',
            cache: 'no-cache',
            body: JSON.stringify({})
        }
        fetch(uri, options)
            .then(response => response.json())
            .then(json => {
                console.log(json)
            })
    }

    useEffect(() => {
        if (form.length === 0) generateForm()
    }, [])
    return (
        <div className='UpdateObject'>
            <form onSubmit={submit}>
                {form}
                <input className='formButtton' value='submit' type='submit' />
            </form>
        </div>
    )
}

export default CreateObject
