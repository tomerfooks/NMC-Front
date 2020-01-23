export default async objectType => {
    const schema = await fetch('http://localhost:4000/api/schema' + objectType)
    return new Promise((resolve, reject) => {
        if (schema) resolve(schema)
        else reject('Error when getting schema')
    })
}
