import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from './AppContext'

const Menu = () => {
    const updateUser = useContext(AppContext).updateCurrentUser
    const currentUser = useContext(AppContext).currentUser
    const toggleSubMenu = e => {
        if (e.target.classList.contains('menuItem')) {
            if (e.target.classList.contains('hovered'))
                e.target.classList.remove('hovered')
            else e.target.classList.add('hovered')
        }
    }
    const logout = () => {
        if (currentUser !== {} && currentUser) updateUser({})
        console.log('logging out')
    }
    return (
        <div className='Menu'>
            <div className='menuItem'>
                <Link to='/'>Home</Link>
            </div>
            <div
                onMouseEnter={toggleSubMenu}
                onMouseLeave={toggleSubMenu}
                className='menuItem'
            >
                <Link to='/post'>Posts</Link>
                <div className='subMenu'>
                    <div className='subMenuItem'>
                        <Link to='/create/post'>Create new Post</Link>
                    </div>
                </div>
            </div>
            <div className='menuItem'>
                <Link to='/login'>Login</Link>
            </div>

            <div className='menuItem'>
                <Link to='/' onClick={logout}>
                    Logout
                </Link>
            </div>
            <div className='menuItem'>
                <Link to='/create/post'>Create</Link>
            </div>
        </div>
    )
}
export default Menu
