import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <div className="Menu">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/post">Posts</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/create/post">Create</Link>
            </div>
        </div>
    )
}
export default Menu
