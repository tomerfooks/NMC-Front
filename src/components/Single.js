import React, { useEffect, useState } from "react"

const Single = props => {
  const [single, setSingle] = useState([])
  const { type, id } = props.match.params

  const getData = () => {
    fetch(`http://localhost:4000/api/${type}/${id}`)
      .then(response => response.json())
      .then(myJson => {
        setSingle(myJson)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return single ? (
    <div key={single.title} className="Single">
      <h2>{single.title}</h2>
      <p>{single.content}</p>
    </div>
  ) : (
    "loading"
  )
}

export default Single
