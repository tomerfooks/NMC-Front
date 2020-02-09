import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AppContext from './AppContext'
export default function SideBar() {
    const appContext = useContext(AppContext)
    const [showSideBar, setShowSideBar] = useState(true)
    const toggleSideBar = () => {
        if (showSideBar) {
            document.querySelector('.Body').style.gridTemplateColumns =
                '1fr 10fr'
            setShowSideBar(false)
        } else {
            document.querySelector('.Body').style.gridTemplateColumns =
                '1fr 4fr'
            setShowSideBar(true)
        }
    }
    if (showSideBar)
        return (
            <div className={'SideBar'}>
                <div onClick={toggleSideBar} className='toggleSideBar'>
                    X
                </div>
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
