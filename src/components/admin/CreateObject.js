import React from 'react'
import { useState, useContext, useEffect } from 'react'
import AppContext from '../AppContext'
import Cookie from 'js-cookie'

const CreateObject = props => {
    const appContext = useContext(AppContext)
    const [createForm, setCreateForm] = useState([])

    const generateCreateForm = () => {
        console.log('Generating Create Form')
        const { objectType } = props.match.params
        const { schema } = appContext.appSettings.schemas[objectType]
        console.log(schema)
        const form = Object.keys(schema).map(fieldKey => {
            return (
                <div className={'formField CreateObject ' + fieldKey}>
                    <input type="text" name={fieldKey} placeholder={fieldKey} />
                </div>
            )
        })
        setCreateForm(form)
    }

    const submit = e => {
        if (!require('../auth/CheckPermissions')) return
        if (!appContext.currentUser.token || !appContext.currentUser.role)
            return
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
        <div className="CreateObject">
            <form onSubmit={submit}>
                {createForm}
                <input className="formField" value="submit" type="submit" />
            </form>
        </div>
    )
}

export default CreateObject
