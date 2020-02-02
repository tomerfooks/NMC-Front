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
        fetch(`http://localhost:4000/api/get/${objectType}`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token
            }
        })
            .then(response => response.json())
            .then(json => {
                json.map(obj => {
                    obj.type = objectType
                })
                console.log(json)

                setArchive(json)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (archive.length === 0) getData()
        return function cleanUp() {
            abortController.abort()
        }
    }, [])

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
