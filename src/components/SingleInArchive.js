import React from 'react'
import { Link } from 'react-router-dom'

const SingleInArchive = props => {
    const singleData = props.props
    const includeFields = ['title', 'type', 'status', 'mainImageURL']

    return (
        <div
            className={'SingleInArchive ' + singleData.type}
            key={singleData._id}
        >
            {Object.keys(singleData).map(fieldKey => {
                const textField = (
                    <div
                        key={fieldKey + 'key'}
                        className={`field ${fieldKey}`}
                    >{`${singleData[fieldKey]}`}</div>
                )
                return (
                    includeFields.includes(fieldKey) && (
                        <Link
                            key={fieldKey + '--key'}
                            to={'/' + singleData.type + '/' + singleData._id}
                        >
                            {textField}
                        </Link>
                    )
                )
            })}
        </div>
    )
}

export default SingleInArchive
