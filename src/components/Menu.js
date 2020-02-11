import React from 'react'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppContext from './AppContext'
import Cookie from 'js-cookie'

const Menu = () => {
    const appSettings = useContext(AppContext).appSettings
    const currentUser = useContext(AppContext).currentUser
    const updateCurrentUser = useContext(AppContext).updateCurrentUser

    const logout = () => {
        if (currentUser !== {} && currentUser) {
            updateCurrentUser({})
            Cookie.remove('token')
            console.log('logging out')
        }
    }

    const logoutMenuItem = () => (
        <div className="menuItem">
            <Link to="/" onClick={logout}>
                Logout
            </Link>
        </div>
    )
    useEffect(() => {}, [currentUser])
    return (
        <div className="Menu">
            <div className="menuItem">
                <Link to="/post">Posts</Link>
            </div>
            <div className="menuItem">
                <Link to="/product">Products</Link>
            </div>
            <div className="menuItem">
                <Link to="/media">Media</Link>
            </div>

            {currentUser.token !== null ? (
                logoutMenuItem()
            ) : (
                <>
                    <div className="menuItem">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="menuItem">
                        <Link to="/register">Register</Link>
                    </div>
                </>
            )}
        </div>
    )
}
export default Menu
