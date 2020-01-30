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
                        className={`field ${fieldKey}`}
                    >{`${singleData[fieldKey]}`}</div>
                )
                const mainImageField = (
                    <div className={`image  ${fieldKey}`}>
                        <img src={singleData['mainImageURL']} />
                    </div>
                )
                return (
                    includeFields.includes(fieldKey) && (
                        <Link to={'/' + singleData.type + '/' + singleData._id}>
                            {fieldKey === 'mainImageURL' ? (
                                <img src={singleData.mainImageURL} />
                            ) : (
                                textField
                            )}
                        </Link>
                    )
                )
            })}
        </div>
    )
}

export default SingleInArchive
