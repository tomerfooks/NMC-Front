const createOne = (objectType, data, currentUser) => {
    if (objectType && data & currentUser) {
        fetchOptions = {
            type: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: currentUser.token
            },
            body: JSON.stringify(newObject)
        }
        fetch('http://localhost:4000/api/create/' + objectType, options)
            .then(response => response.json())
            .then(json => json)
            .catch(err => err)
    }
}

export default createOne
