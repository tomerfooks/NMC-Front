import React from 'react'
import { Link } from 'react-router-dom'

const SingleInArchive = props => {
    const singleData = props.props
    const includeFields = ['title', 'content', 'type', 'status']

    if (typeof singleData.content === 'undefined') return <></>
    if (typeof singleData.type === 'undefined') return <></>

    return (
        <div
            className={'SingleInArchive ' + singleData.type}
            key={singleData._id}
        >
            {Object.keys(singleData).map(
                fieldKey =>
                    includeFields.includes(fieldKey) && (
                        <Link
                            key={'-' + fieldKey}
                            to={'/' + singleData.type + '/' + singleData._id}
                        >
                            <div
                                className={`field ${fieldKey}`}
                            >{`${singleData[fieldKey]}`}</div>
                        </Link>
                    )
            )}
        </div>
    )
}

export default SingleInArchive
