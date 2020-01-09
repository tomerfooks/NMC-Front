import React, { useEffect, useState } from 'react'

const Single = props => {
  const [single, setSingle] = useState([])
  const { type, id } = props.match.params

  const getData = query => {
    console.log('getting datafor single..')
    fetch(`http://localhost:4000/api/${type}/${id}`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setSingle(json)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return single ? (
    <div key={single.title} className="Single">
      <img src={single.mainImage} />
      {Object.keys(single).map(fieldKey => {
        if (fieldKey !== '_id' && fieldKey !== 'id')
          return (
            <div className={'field ' + fieldKey}>{`${single[fieldKey]}`}</div>
          )
        return <></>
      })}
    </div>
  ) : (
    'loading'
  )
}

export default Single
