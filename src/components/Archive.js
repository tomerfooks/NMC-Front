import React, { useEffect, useState, useContext,Link } from 'react'
import AppContext from './AppContext'

const Archive = props => {
    const [archive, setArchive] = useState([])
    const [query, setQuery] = useState({})
    const [perPage, setPerPage] = useState(55)
    const [pageNumber, setPageNumber] = useState(0)    
    const { objectType } = props.match.params
    const appContext = useContext(AppContext)

    const fieldsToInclude = ['type','status','category']
    const filtersToInclude = ['status','category']

    const getData = () => {
        console.log('getting data from API')
        fetch(`http://localhost:4000/api/get/${objectType}`, {
            signal: new AbortController().signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token,
                perPage: perPage,
                pageNumber: pageNumber,
                query: JSON.stringify(query)
            },
        })
            .then(res => res.json())
            .then(json => {
                json.map(obj => (obj.type = objectType))
                setArchive(json)
            })
            .catch(err => console.log(err))
    }
    const nextPage = () => 
        setPageNumber(pageNumber + 1)
    
    const previousPage = () => 
        setPageNumber(pageNumber - 1)
    
    const changePerPage = e => {
        setPageNumber(0)
        setPerPage(e.target.value)
    }
    const filters = () => {
        const { schema } = appContext.appSettings.schemas[objectType]
        const getOptions = (field)=>{
            const options = []
            archive.map(single=>{
                Object.keys(single).map(fieldKey=>{
                    if(fieldKey===field)
                    if(!options.includes(single[fieldKey]))
                        options.push(single[fieldKey])
                })
            })
            return options
        }
        const updateFilters = (e) => {
            console.log('Updating filters..',e.target.value)
            setQuery({[e.target.classList[0]]:e.target.value})
            getData()
        }
        return <div className="archiveFilters">{
        Object.keys(schema).map(field=>
                schema[field].filterable ?
                    <div className="filter">
                    <select className={field} defaultValue={''} onChange={updateFilters} >
                    <option disabled selected  onChange={updateFilters}>Select {field}</option>
                    {getOptions(field).map(option=>{
                    return <option value={option}>{option}</option>
                    })}
                    </select>
                    </div> : null
        )
        }</div>
    }
    const pagination = () => {
           return (<div>
             <button onClick={previousPage}>Prev</button>
    ( {pageNumber+1 } )
            <button onClick={nextPage}>Next</button>
            | Per Page: <input type='number' defaultValue={perPage} onChange={changePerPage}></input>
            </div>
           )
    }
    const sort = () => {
        return <div>Sort By</div>
    }
    useEffect(() => {
        getData(query)
    }, [objectType, pageNumber,perPage, query])
    return  (
        <div className={'Archive ' + objectType} key={'archive ' + objectType}>
            {pagination()}            
            {filters()}
            {sort()}
            {archive.map(single =>
                <div key={single._id} className={'singleInArchive '+single.type}>
                <h3>{single.title}</h3>
                {Object.keys(single).map(fieldKey=>
                fieldsToInclude.includes(fieldKey) ?
                    <div key={single._id+'-'+fieldKey} className={"field "+ fieldKey}>
                    {single[fieldKey]}
                    </div> : null
                )}
                </div>
            )}
        </div>
    ) 
}
export default Archive
