import React from "react"

const SingleInArchive = props => {
    const singleData = props.props
    const includeFields = ["title", "content", "type"]
    if (typeof singleData.type === "undefined") return <h3>Loading..</h3>
    return (
        <div
            className={"SingleInArchive " + singleData.type}
            key={singleData._id}
        >
            <div>
                {Object.keys(singleData).map(fieldKey => {
                    if (includeFields.includes(fieldKey))
                        return (
                            <div
                                className={"field " + fieldKey}
                            >{`${singleData[fieldKey]}`}</div>
                        )
                    return <></>
                })}
            </div>
        </div>
    )
}

export default SingleInArchive
