import React from 'react'
import { Link } from 'react-router-dom'
const menuData = [
    {
        name: 'Home',
        link: '/'
    }
]

const Menu = () => {
    return (
        <div className='Menu'>
            <div className='menuItem'>
                <Link to='/'>Home</Link>
            </div>
            <div className='menuItem'>
                <Link to='/post'>Posts</Link>
            </div>
            <div className='menuItem'>
                <Link to='/login'>Login</Link>
            </div>
            <div className='menuItem'>
                <Link to='/create/post'>Create</Link>
            </div>
        </div>
    )
}
export default Menu
