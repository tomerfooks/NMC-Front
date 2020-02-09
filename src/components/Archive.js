import React, { useEffect, useState, useContext } from 'react'

import SingleInArchive from './SingleInArchive'
import AppContext from './AppContext'
const Archive = props => {
    const [archive, setArchive] = useState([])
    const [perPage, setPerPage] = useState(5)
    const [pageNumber, setPageNumber] = useState(0)
    const perPageInput = React.createRef()
    const { objectType } = props.match.params
    const abortController = new AbortController()
    const signal = abortController.signal
    const appContext = useContext(AppContext)

    const getData = query => {
        setArchive([])
        fetch(`http://localhost:4000/api/get/${objectType}`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token,
                perPage: perPage,
                pageNumber: pageNumber
            }
        })
            .then(res => res.json())
            .then(json => {
                setArchive([])
                json.map(obj => (obj.type = objectType))
                setArchive(json)
            })
            .catch(err => console.log(err))
    }
    const nextPage = () => {
        setPageNumber(pageNumber + 1)
        getData()
    }
    const previousPage = () => {
        if (pageNumber === 0) return
        setPageNumber(pageNumber - 1)
        getData()
    }
    const changePerPage = e => {
        setPerPage(e.target.value)
        getData()
    }

    const pagination = () => {
           return (<>
             <button onClick={previousPage}>Previous Page </button>
            <button onClick={nextPage}>Next Page </button>
            <input type='number' defaultValue={perPage} onChange={changePerPage}></input>
           </>)
    }
    const filter = () =>{
        return <></>
    }
    useEffect(() => {
        if(archive.length===0)
        getData()
    }, [objectType, pageNumber,perPage])

    return  (
        archive.length!==0 ? <div className={'Archive ' + objectType} key={'archive ' + objectType}>
            {pagination()}
            {archive.map(singleData => {
                return (
                    <SingleInArchive key={singleData._id} props={singleData} />
                )
            })}
        </div> :  <>Loading</> 
    ) 
}
export default Archive
