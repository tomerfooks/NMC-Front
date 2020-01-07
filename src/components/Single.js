import React, { useEffect, useState } from "react"

const Single = props => {
  const [single, setSingle] = useState([])
  const { type, id } = props.match.params
  const [singleFields, setArchiveFields] = useState(["title", "content"])

  const getData = query => {
    fetch(`http://localhost:4000/api/${type}/${id}`)
      .then(response => response.json())
      .then(json => {
        setSingle(json)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return single ? (
    <div key={single.title} className="Single">
      {Object.keys(single).map(fieldKey => {
        if (
          fieldKey !== "_id" &&
          fieldKey !== "id" &&
          singleFields.includes(fieldKey)
        )
          return (
            <div className={"field " + fieldKey}>{`${single[fieldKey]}`}</div>
          )
        return <></>
      })}
    </div>
  ) : (
    "loading"
  )
}

export default Single
