import React, { useState, useEffect } from 'react'

const Media = () => {
  const fileInput = React.createRef()
  const [images, setImages] = useState([])

  const preview = e => {
    e.preventDefault()
    const files = fileInput.current.files
    const updatedImages = []
    Object.keys(files).map((file, index) => {
      if (files[file].size > 2000000)
        throw new Error('File is too big. Maximum size is 2mb')
      const reader = new FileReader()
      const url = reader.readAsDataURL(files[file])
      reader.onloadend = e => {
        updatedImages.push(reader.result)
        if (index >= Object.keys(files).length - 1) setImages(updatedImages)
      }
    })
  }
  const submit = e => {
    e.preventDefault()
  }

  useEffect(() => {}, [images])
  return (
    <>
      <form>
        <input
          onChange={preview}
          type='file'
          multiple
          ref={fileInput}
          name='addImage'
        />
        <input type='submit' />
      </form>
      Preview
      <div className='preview'>
        {images.map(oneImage => (
          <img src={oneImage} />
        ))}
      </div>
    </>
  )
}
export default Media
