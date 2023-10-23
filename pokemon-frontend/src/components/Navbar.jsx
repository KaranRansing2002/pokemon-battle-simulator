import React, { useContext, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import './Buttons/ButtonP.css'
import { Button } from '@mui/material';
import { userContext } from '../App';
import axios from 'axios';
import api from '../helper/api';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { userinfo, setUserinfo } = useContext(userContext);

  // console.log(userinfo)

  const navigate = useNavigate()

  const handleNav = () => {
    setNav(!nav);
  };
  const handleLogout = async () => {
    await axios.get(`${api}/user/logout`, {
      withCredentials: true
    });
    localStorage.clear();
    navigate('/');
    setUserinfo(undefined);
  }

  return (
    <div className='flex justify-between w-full items-center mx-auto px-4 text-white'>
      <Link to='/'><h1 className='ml-4 text-3xl font-bold text-[#00df9a]'>SHOWDOWN</h1></Link>
      <ul className='hidden md:flex items-center'>
        <Link to='/'><li className='p-4 hover:text-[#00df9a] transition-colors duration-500 ease-in-out cursor-pointer'>Home</li></Link>
        <Link to='/teambuilder'><li className='p-4 hover:text-[#00df9a] transition-colors duration-500 ease-in-out cursor-pointer'>TeamBuilder</li></Link>
        <Link to='/myteams'><li className='p-4 hover:text-[#00df9a] transition-colors duration-500 ease-in-out cursor-pointer'>MyTeams</li></Link>
        <Link to='/battle'><li className='p-4 hover:text-[#00df9a] transition-colors duration-500 ease-in-out cursor-pointer'>Battle</li></Link>
        <Link to='/leaderboard'><li className='p-4 hover:text-[#00df9a] transition-colors duration-500 ease-in-out cursor-pointer'>LeaderBoard</li></Link>
        {userinfo ? <li className='p-4 text-[#00df9a] font-bold uppercase cursor-pointer'>{userinfo.username}</li> : <Button onClick={() => navigate('/signin')} id='idr' variant='contained' size='small' sx={{ marginLeft: '40px', backgroundColor: '#560bad' }}>sign-in</Button>}
        {userinfo && <Button onClick={() => { handleLogout() }} id='idr' variant='contained' size='small' sx={{ marginLeft: '0px', backgroundColor: '#560bad' }}>logout</Button>}
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed z-50 left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>SHOWDOWN</h1>
        {userinfo ? <li className='p-4 text-[#00df9a] font-bold uppercase cursor-pointer'>{userinfo.username}</li> : <Button onClick={() => navigate('/signin')} id='idr' variant='contained' size='small' sx={{ marginLeft: '10px', backgroundColor: '#560bad' }}>sign-in</Button>}
        <Link to='/'><li className='p-4 border-b border-gray-600'>Home</li></Link>
        <Link to='/teambuilder'><li className='p-4 border-b border-gray-600'>TeamBuilder</li></Link>
        <Link to='/myteams'><li className='p-4 border-b border-gray-600'>MyTeams</li></Link>
        <Link to='/battle'><li className='p-4 border-b border-gray-600'>Battle</li></Link>
        <Link to='/leaderboard'><li className='p-4'>LeaderBoard</li></Link>
        {userinfo && <Button onClick={handleLogout} id='idr' variant='contained' size='small' sx={{ marginLeft: '10px', backgroundColor: '#560bad' }}>logout</Button>}
      </ul>
    </div>
  );
};

export default Navbar;