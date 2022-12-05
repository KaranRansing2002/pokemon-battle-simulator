import React from 'react'
import logo from './logo.png'
import {Link} from 'react-router-dom';


function Navbar() {
  return (
    <div className='h-16 bg-[#202225]'>
        <div className='h-full'>
            <Link to='/'><img className='p-2' src={logo}></img></Link>
        </div>
    </div>
  )
}

export default Navbar
