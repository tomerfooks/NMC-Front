import React from 'react'

const SingleInArchive = props => {
  const singleData = props.props
  const includeFields = ['title', 'content', 'type']

  if (typeof singleData.content === 'undefined') return <></>

  return (
    <div className={'SingleInArchive '} key={singleData._id}>
      {Object.keys(singleData).map(
        fieldKey =>
          includeFields.includes(fieldKey) && (
            <div
              className={`field ${fieldKey}`}
            >{`${singleData[fieldKey]}`}</div>
          )
      )}
    </div>
  )
}

export default SingleInArchive
