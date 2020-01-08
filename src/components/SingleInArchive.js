import React, { useEffect, useState } from "react"
import { Link, Router } from "react-router-dom"

const SingleInArchive = props => {
    const singleData = props.props

    return (
        <div className="Archive grid grid3">
            <div
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
    )
}

export default SingleInArchive
