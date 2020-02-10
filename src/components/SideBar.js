import React from 'react'
import { useContext, useEffect, useState } from 'react'
import AppContext from './AppContext'
export default function SideBar() {
    const appContext = useContext(AppContext)
    const [showSideBar, setShowSideBar] = useState(true)
    if (appContext.appSettings.settings.layout.indexOf('sidebar') !== -1)
        return showSideBar ? (
            <div className={'SideBar'}>
                <div className="toggleSideBar">X</div>
                Side bar
            </div>
        ) : null
    else return null
}
