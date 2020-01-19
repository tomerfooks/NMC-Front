import React, { useEffect, useState } from 'react'
import SingleInArchive from './templates/post/SingleInArchive'

const Archive = props => {
    const [archive, setArchive] = useState([])
    const { type } = props.match.params

    const getData = query => {
        fetch(`http://localhost:4000/api/get/${type}`)
            .then(response => {
                return response.json()
            })
            .then(myJson => {
                setArchive(myJson)
            })
    }

    useEffect(() => {
        getData({})
    }, [])

    return (
        <div className={'Archive ' + type} key={'archive ' + type}>
            {archive.map(singleData => {
                console.log(singleData)
                return (
                    <SingleInArchive key={singleData.id} props={singleData} />
                )
            })}
        </div>
    )
}

export default Archive
