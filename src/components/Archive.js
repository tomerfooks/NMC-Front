import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Archive = props => {
    const [archive, setArchive] = useState([])
    const { type } = props.match.params

    const getData = query => {
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

    return (
        <div className="Archive">
            {archive.map(singleData => (
                <Card
                    variant="outlined"
                    className={"SingleInArchive " + singleData.type}
                    key={singleData._id}
                >
                    <CardContent>
                        {Object.keys(singleData).map(fieldKey => {
                            if (
                                fieldKey !== "_id" &&
                                fieldKey !== "id" &&
                                archiveFields.includes(fieldKey)
                            )
                                return (
                                    <Typography
                                        className={"field " + fieldKey}
                                    >{`${singleData[fieldKey]}`}</Typography>
                                )
                            return <></>
                        })}
                    </CardContent>
                    <CardActions>
                        <Link to={`/${type}/${singleData._id}`}>
                            <Button size="small">More</Button>
                        </Link>
                    </CardActions>
                </Card>
            ))}
        </div>
    )
}

export default Archive
