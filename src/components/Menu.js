import React from 'react'
import { Link } from 'react-router-dom'
const menuData = [
    {
        name: 'Home',
        link: '/'
    }
]
const toggleSubMenu = e => {
    if (e.target.classList.contains('menuItem')) {
        if (e.target.classList.contains('hovered'))
            e.target.classList.remove('hovered')
        else e.target.classList.add('hovered')
    }
}
const Menu = () => {
    return (
        <div className="Menu">
            <div className="menuItem">
                <Link to="/">Home</Link>
            </div>
            <div
                onMouseEnter={toggleSubMenu}
                onMouseLeave={toggleSubMenu}
                className="menuItem"
            >
                <Link to="/post">Posts</Link>
                <div className="subMenuItem">
                    <Link to="/create/post">Create new Post</Link>
                </div>
                <div className="subMenuItem"></div>
            </div>
            <div className="menuItem">
                <Link to="/login">Login</Link>
            </div>
            <div className="menuItem">
                <Link to="/create/post">Create</Link>
            </div>
        </div>
    )
}
export default Menu
