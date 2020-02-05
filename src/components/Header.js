import React from 'react'
import Menu from './Menu'

const Header = () => {
    return (
        <div className='Header'>
            <img
                className='logo'
                src={require('../images/logo.png')}
                alt='logo'
            />{' '}
            <Menu></Menu>
        </div>
    )
}

export default Header
