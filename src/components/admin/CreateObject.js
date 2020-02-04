import React from 'react'
import { useState, useContext, useEffect } from 'react'
import AppContext from '../AppContext'
import Cookie from 'js-cookie'

const CreateObject = props => {
    const appContext = useContext(AppContext)
    const [createForm, setCreateForm] = useState([])
    const { objectType } = props.match.params
    const { schema } = appContext.appSettings.schemas[objectType]

    const generateCreateForm = () => {
        console.log('Generating Create Form ' + objectType)
        const form = Object.keys(schema).map(fieldKey => {
            return (
                <div
                    key={fieldKey}
                    className={'formField CreateObject ' + fieldKey}
                >
                    <input type='text' name={fieldKey} placeholder={fieldKey} />
                </div>
            )
        })
        setCreateForm(form)
    }

    const submit = e => {
        e.preventDefault()
        if (!require('../auth/CheckPermissions')) return
        if (!appContext.currentUser.token || !appContext.currentUser.role)
            return
        const newObject = {}
        Object.keys(schema).map(fieldKey => {
            if (typeof e.target[fieldKey].value !== 'undefined')
                newObject[fieldKey] = e.target[fieldKey].value
        })
        const uri = 'http://localhost:4000/api/create/' + objectType
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token
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
    useEffect(() => {
        if (appContext.appSettings.settings)
            if (createForm.length === 0) generateCreateForm()
    })
    return (
        <div className='CreateObject'>
            <form onSubmit={submit}>
                {createForm}
                <input className='formField' value='submit' type='submit' />
            </form>
        </div>
    )
}

export default CreateObject
