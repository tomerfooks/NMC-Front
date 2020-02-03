import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from './AppContext'
import Cookie from 'js-cookie'

const Menu = () => {
    const appSettings = useContext(AppContext).appSettings
    const currentUser = useContext(AppContext).currentUser
    const updateCurrentUser = useContext(AppContext).updateCurrentUser

    const toggleSubMenu = e => {
        if (e.target.classList.contains('menuItem')) {
            if (e.target.classList.contains('hovered'))
                e.target.classList.remove('hovered')
            else e.target.classList.add('hovered')
        }
    }
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

    return (
        <div className="Menu">
            <div onMouseEnter={toggleSubMenu} className="menuItem">
                <Link to="/post">Posts</Link>
                <div className="subMenu">
                    <div className="subMenuItem">
                        <Link to="/create/post">Create new Post</Link>
                    </div>
                </div>
            </div>
            <div onMouseEnter={toggleSubMenu} className="menuItem">
                <Link to="/product">Products</Link>
                <div className="subMenu">
                    <div className="subMenuItem">
                        <Link to="/create/product">Create new Product</Link>
                    </div>
                </div>
            </div>
            {currentUser.token !== null ? (
                logoutMenuItem()
            ) : (
                <div className="menuItem">
                    <Link to="/login">Login</Link>
                </div>
            )}
        </div>
    )
}
export default Menu
