import React, { useContext, useEffect, useState } from 'react'
import SingleInArchive from './templates/post/SingleInArchive'

const Archive = props => {
    const [archive, setArchive] = useState([])
    const { type } = props.match.params
    const abortController = new AbortController()
    const signal = abortController.signal

    const getData = query => {
        fetch(`http://localhost:4000/api/get/${type}`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'tomer'
            }
        })
            .then(response => {
                return response.json()
            })
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
        <div className={'Archive ' + type} key={'archive ' + type}>
            {archive.map(singleData => {
                return (
                    <SingleInArchive key={singleData.id} props={singleData} />
                )
            })}
        </div>
    )
}
export default Archive
