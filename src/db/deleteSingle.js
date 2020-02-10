import React, {useContext} from 'react'
import AppContext from '../components/AppContext'

export default async(id,objectType) => {
const appContext = useContext(AppContext) 
 return new Promise((resolve,reject)=>{
     console.log('deleting '+id)
    fetch(`http://localhost:4000/api/delete/${objectType}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: appContext.currentUser.token,
            }
        })
 })   
}