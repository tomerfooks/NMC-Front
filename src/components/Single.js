import React, { useEffect, useState, useContext } from 'react'

const Single = props => {
    const [single, setSingle] = useState([])
    const { objectType, id } = props.match.params
    const getData = () => {
        console.log('Getting data for single..')
        fetch(`http://localhost:4000/api/get/${objectType}/${id}`)
            .then(response => response.json())
            .then(json => setSingle(json))
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
        <div key={single.id} className="Single">
            <div className="Single title">
                {single.title ? single.title : 'Title not exists'}
            </div>
            <img src={single.mainImageURL} className="Single mainImageURL" />
            <div
                className="Single content"
                dangerouslySetInnerHTML={renderHTML(single.content)}
            ></div>
        </div>
    )
}

export default Single
