import React from 'react'
import { Link } from 'react-router-dom'
const SideNav = () => {
  return (
    <nav>
        <ul className='nav flex-column'>
            <li className='nav-item'>
                <Link to='/user' className='nav-link'>User</Link>
            </li>
            <li className='nav-item'>
                <Link to='/password' className='nav-link'>Password</Link>
            </li>
            <li className='nav-item'>
                <Link to='/wishlist' className='nav-link'>Wishlist</Link>
            </li>
        </ul>
    </nav>
  )
}

export default SideNav