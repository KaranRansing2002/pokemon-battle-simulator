import React, { useState } from 'react'
import logo from './logo.png'
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

function Navbar({ userinfo,setUserinfo }) {
  return (
    <div className='h-16 bg-[#202225]'>
        <div className='h-full flex items-center w-full'>
          <Link className='flex-[0.95]' to='/'><img className='p-2' src={logo}></img></Link>
          <div className=''>
          {userinfo == undefined ? <Link to='/signin'><Button variant='contained'>sign in</Button></Link> :
            <div className='text-slate-400 cursor-pointer flex justify-center items-center'>
              <img className='object-contain h-14 m-2' src={require('./images/rayquaza.png')}></img>
              {userinfo.username}
              <Button onClick={() => { setUserinfo(undefined); localStorage.removeItem("userinfo"); axios.get('http://localhost:8000/user/signout',{withCredentials : true}).then((resp)=>alert(resp.data.message))}}>Sign-Out</Button>
            </div>}
          </div>
        </div>
    </div>
  )
}

export default Navbar
