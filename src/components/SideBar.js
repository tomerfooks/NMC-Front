import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AppContext from './AppContext'
export default function SideBar() {
    const appContext = useContext(AppContext)
    const [showSideBar, setShowSideBar] = useState(true)
    const toggleSideBar = () => {
        if (showSideBar) setShowSideBar(false)
        else setShowSideBar(true)
    }
    if (showSideBar)
        return (
            <div className={'SideBar'}>
                <div onClick={toggleSideBar} className='toggleSideBar'>
                    X
                </div>{' '}
                Side bar
            </div>
        )
    else
        return (
            <div onClick={toggleSideBar} className='toggleSideBar'>
                X
            </div>
        )
}
