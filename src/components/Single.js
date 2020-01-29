import React, { useEffect, useState, useContext } from 'react'

const Single = props => {
    const [single, setSingle] = useState([])
    const { objectType, id } = props.match.params
    console.log(objectType)
    const getData = () => {
        console.log('Getting data for single..')
        fetch(`http://localhost:4000/api/get/${objectType}/${id}`)
            .then(response => response.json())
            .then(json => setSingle(json))
    }
    useEffect(() => {
        if (single.length === 0) getData()
    }, [])

    return (
        <div key={single.title} className='Single'>
            {Object.keys(single).map(fieldKey => {
                if (fieldKey !== '_id' && fieldKey !== 'id')
                    if (fieldKey === 'mainImage')
                        return (
                            <div className='mainImage'>
                                <img src={'https://via.placeholder.com/300'} />
                            </div>
                        )
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
