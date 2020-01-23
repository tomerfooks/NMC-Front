import React, { useEffect, useState } from 'react'

import SingleInArchive from './templates/post/SingleInArchive'

const Archive = props => {
    const [archive, setArchive] = useState([])
    const { objectType } = props.match.params
    const abortController = new AbortController()
    const signal = abortController.signal

    const getData = query => {
        fetch(`http://localhost:4000/api/get/${objectType}`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: props.currentUser.token
            }
        })
            .then(response => response.json())
            .then(myJson => {
                setArchive(myJson)
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
