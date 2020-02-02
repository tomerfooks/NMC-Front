import React, { useEffect, useState, useContext } from 'react'
import AppContext from './AppContext'
const Single = props => {
    const [single, setSingle] = useState([])
    const { objectType, id } = props.match.params

    const getData = () => {
        console.log('Getting data for single..')
        fetch(`http://localhost:4000/api/get/${objectType}/${id}`)
            .then(response => {
                return response.json()
            })
            .then(myjson => setSingle(myjson))
            .catch(err => console.log('Error getting data for ' + id, err))
    }
    const renderHTML = content => {
        return {
            __html: content
        }
    }

    useEffect(() => {
        if (single.length === 0) getData()
    }, [])

    return (
        <div key={single.id} className='Single'>
            <div className='singleField title'>
                {single.title ? single.title : 'Loading single'}
            </div>
            <img
                src={single.mainImageURL}
                className='singleField mainImageURL'
            />
            <div
                className='singleField content'
                dangerouslySetInnerHTML={renderHTML(single.content)}
            ></div>
            <div className='singleField status'>Status:{single.status}</div>
        </div>
    )
}

export default Single
