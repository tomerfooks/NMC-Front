import React, { useEffect, useState } from "react"
import { Link, Router } from "react-router-dom"
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography
} from "@material-ui/core"

const Archive = props => {
    const [archive, setArchive] = useState([])
    const [archiveFields, setArchiveFields] = useState([
        "title",
        "content",
        "type"
    ])
    const { type } = props.match.params

    const getData = query => {
        let requestBody = {}
        fetch(`http://localhost:4000/api/${type}`)
            .then(response => {
                return response.json()
            })
            .then(myJson => {
                setArchive(myJson)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return archive ? (
        <div className="Archive grid grid3">
            {archive.map(singleData => (
                <div
                    variant="outlined"
                    className={"SingleInArchive " + singleData.type}
                    key={singleData._id}
                >
                    <div>
                        {Object.keys(singleData).map(fieldKey => {
                            if (
                                fieldKey !== "_id" &&
                                fieldKey !== "id" &&
                                archiveFields.includes(fieldKey)
                            )
                                return (
                                    <div
                                        className={"field " + fieldKey}
                                    >{`${singleData[fieldKey]}`}</div>
                                )
                            return <></>
                        })}
                    </div>
                    <div className="options">
                        <Link to={`/${type}/${singleData._id}`}>
                            <Button>More</Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        "loading"
    )
}

export default Archive
