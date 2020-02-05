import React from 'react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppContext from './AppContext'
import Cookie from 'js-cookie'

const Menu = () => {
    const appSettings = useContext(AppContext).appSettings
    const currentUser = useContext(AppContext).currentUser
    const updateCurrentUser = useContext(AppContext).updateCurrentUser

    const showSubMenu = e => {
        e.target.classList.add('hovered')
    }
    const hideSubMenu = e => {
        e.target.classList.remove('hovered')
    }
    const logout = () => {
        if (currentUser !== {} && currentUser) {
            updateCurrentUser({})
            Cookie.remove('token')
            console.log('logging out')
        }
    }

    const logoutMenuItem = () => (
        <div className='menuItem'>
            <Link to='/' onClick={logout}>
                Logout
            </Link>
        </div>
    )
    useEffect(() => {}, [currentUser])
    return (
        <div className='Menu'>
            <div
                onMouseEnter={showSubMenu}
                onMouseLeave={hideSubMenu}
                className='menuItem'
            >
                <Link to='/post'>Posts</Link>
                <div onMouseLeave={hideSubMenu} className='subMenu'>
                    <div className='subMenuItem'>
                        <Link to='/create/post'>Create new Post</Link>
                    </div>
                </div>
            </div>
            <div
                onMouseEnter={showSubMenu}
                onMouseLeave={hideSubMenu}
                className='menuItem'
            >
                <Link to='/product'>Products</Link>
                <div className='subMenu'>
                    <div className='subMenuItem'>
                        <Link to='/create/product'>Create new Product</Link>
                    </div>
                </div>
            </div>
            {currentUser.token !== null ? (
                logoutMenuItem()
            ) : (
                <div className='menuItem'>
                    <Link to='/login'>Login</Link>
                </div>
            )}
        </div>
    )
}
export default Menu
