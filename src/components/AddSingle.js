import React, { useEffect, useState } from "react"
import { Link, Router } from "react-router-dom"
import FormControl from "@material-ui/core/FormControl"

const AddSingle = props => {
  const fieldsSchema = require("../schemas/defaultFieldsSchema.js").default
  const [fields, setFields] = useState(fieldsSchema)

  const handleChange = e => {
    let value = e.target.value
    let key = e.target.getAttribute("field-key")
    fieldsSchema.forEach(field => {
      if (field.key == key) {
        field.value = value
        setFields(fieldsSchema)
        return
      }
    })
  }

  const addSubmit = e => {
    e.preventDefault()
    let validatedFields = require("../validation/addSubmitValidation.js").submitValidator(
      fieldsSchema
    )
    if (validatedFields.status) console.log("hooray")
  }

  return (
    <div className="AddSingle">
      {fields.map(field => {
        return (
          <input
            field-key={field.key}
            onChange={handleChange}
            className={field.class}
            type={field.inputType}
            placeholder={field.placeholder}
          ></input>
        )
      })}
      <button onClick={addSubmit} className="submitButton">
        Add
      </button>
    </div>
  )
}

export default AddSingle
