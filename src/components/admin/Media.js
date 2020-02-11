import React, { useState } from 'react'

const Media = () => {
    const fileInput = React.createRef()
    const [images, setImages] = useState([])
    const submit = e => {
        e.preventDefault()
        const files = fileInput.current.files
        Object.keys(files).map(file => {
            const reader = new FileReader()
            var url = reader.readAsDataURL(files[file])
            const updatedImages = images
            reader.onloadend = e => {
                updatedImages.push(reader.result)
                setImages(updatedImages)
            }
        })
    }
    return (
        <>
            <form onSubmit={submit}>
                <input type="file" multiple ref={fileInput} name="addImage" />
                <input type="submit" />
            </form>
            Preview
            {images.map(oneImage => {
                console.log('ssa', oneImage)
                return <img src={oneImage} />
            })}
        </>
    )
}
export default Media
