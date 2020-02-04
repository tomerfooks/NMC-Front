import React, { useEffect, useState, useContext } from 'react'

import SingleInArchive from './SingleInArchive'
import AppContext from './AppContext'
const Archive = props => {
    const [archive, setArchive] = useState([])
    const { objectType } = props.match.params
    const abortController = new AbortController()
    const signal = abortController.signal
    const appContext = useContext(AppContext)

    const getData = query => {
        console.log('Display Archive of ' + objectType)
        setArchive([])
        fetch(`http://localhost:4000/api/get/${objectType}?limit=5`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token
            }
        })
            .then(response => response.json())
            .then(json => {
                json.map(obj => (obj.type = objectType))
                console.log('Setting Archive', json)
                setArchive(json)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
        return function cleanUp() {
            abortController.abort()
        }
    }, [objectType])

    return (
        <div className={'Archive ' + objectType} key={'archive ' + objectType}>
            {archive.map(singleData => {
                return (
                    <SingleInArchive key={singleData._id} props={singleData} />
                )
            })}
        </div>
    )
}
export default Archive
