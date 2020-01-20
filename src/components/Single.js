import React, { useEffect, useState, useContext } from 'react'
import AuthContext from './AuthContext'

const Single = props => {
    const [single, setSingle] = useState([])
    const { type, id } = props.match.params
    const getData = query => {
        console.log('getting data for single..')
        fetch(`http://localhost:4000/api/get/${type}/${id}`)
            .then(response => response.json())
            .then(json => {
                setSingle(json)
            })
    }

    useEffect(() => {
        getData({})
    }, [])

    return (
        <div key={single.title} className="Single">
            {Object.keys(single).map(fieldKey => {
                if (fieldKey !== '_id' && fieldKey !== 'id')
                    return (
                        <div
                            className={'field ' + fieldKey}
                        >{`${single[fieldKey]}`}</div>
                    )
                return <></>
            })}
        </div>
    )
}

export default Single
