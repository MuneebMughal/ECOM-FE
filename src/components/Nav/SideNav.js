import React from 'react'
import { Link } from 'react-router-dom'
const SideNav = () => {
  return (
    <nav>
        <ul className='nav flex-column'>
            <li className='nav-item'>
                <Link to='/user' className='nav-link'></Link>
            </li>
            <li className='nav-item'>
                <Link to='/user' className='nav-link'></Link>
            </li>
            <li className='nav-item'>
                <Link to='/user' className='nav-link'></Link>
            </li>
        </ul>
    </nav>
  )
}

export default SideNav