import React, { useEffect, useRef, useState } from 'react'
import logo from './logo.png'
import {Link,useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import baseUrl from './url';
import './components/Buttons/ButtonP.css'
import { Sling as Hamburger } from 'hamburger-react'
import Sidebar from './components/Sidebar';


function Navbar({userinfo,setUserinfo,setToggle}) {
  const navigate = useNavigate();
  const navItems = useRef(['Home', 'TeamBuilder', 'MyTeams', 'Battle'])
  const isTeamSelected = localStorage.getItem('myteam') != undefined;
  
  return (
    <div className='h-16 bg-transparent flex items-center '>
      <Hamburger color='white' onToggle={()=>setToggle(value => !value)}/>
      <div className='md:flex-[0.3] flex-1 pl-6'><Link to='/'><img className='p-2' src={logo}></img></Link></div>
      <div className='sm:flex sm:flex-[0.6] sm:items-center sm:justify-center sm:gap-8 hidden '>
        {
          navItems.current.map((item, index) => {
            return <Link to={`${item=='Home' ? '/' : item=='Battle' && !isTeamSelected ? '/myteams' : item.toLowerCase()}`}><h2 className='text-slate-300 cursor-pointer hover:text-slate-100 r-2' key={index}>{ item }</h2></Link>
          })
        }
      </div>
      <div className='flex md:flex-[0.3]  justify-center items-center gap-2'>
        {userinfo != undefined && <img className = 'hidden h-16 md:block' src={require('./images/rayquaza.png')} />}
        <h2 className='text-slate-400'>{ userinfo?.username }</h2>
        {
          userinfo != undefined ? <Button id='idr' onClick={() => { setUserinfo(undefined); localStorage.clear(); axios.get(`${baseUrl}/user/signout`, { withCredentials: true }).then((resp) => alert(resp.data.message)); navigate('/signin')}}>Sign-Out</Button> : <Button id='idr' onClick={()=>navigate('/signin')}>Signin</Button>
        }
      </div>
    </div>
  )
}

export default Navbar
