import React, { useEffect, useState } from "react"
import { Link, Router } from "react-router-dom"

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

    const setData = query => {
        console.log("setting data")
        fetch("http://localhost:4000/api/post/add", {
            method: "POST"
        }).then(response => {
            response.json().then(json => console.log(json))
        })
    }

    const addSubmit = e => {
        e.preventDefault()
        setData()
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
