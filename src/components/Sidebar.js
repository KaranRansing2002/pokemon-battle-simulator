import Button from '@mui/material/Button';
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Buttons/button.css'
import './Cards/cards.css'
import './Buttons/explorebutton.css'
import {useNavigate} from 'react-router-dom'

function Sidebar({isTeamSelected,toggle}) {
  const navItems = useRef(['Home', 'TeamBuilder', 'MyTeams', 'Battle'])
  const navigate = useNavigate();

  return ( 
    <div className={`bg-[#202225] h-[89%] absolute w-[${toggle ? '350px' : '0px'}] z-50 transition-width duration-200 ease-linear `} >
      {
        toggle && 
        <div className='h-full w-full flex flex-col items-center'>
            <div className='p-8 hover:bg-gray-800 w-full text-center'>
              <Link to="/"><h1 className='text-slate-400 hover:text-slate-100'>Home</h1></Link>
            </div>
            <div className='p-8 hover:bg-gray-800 w-full text-center'>
              <Link to="/teambuilder">
                <Button id='idt'>
                  Teambuilder
                </Button>
              </Link>
            </div>
            <div className='p-8 hover:bg-gray-800 w-full text-center'>
              <button onClick={()=>navigate('/teambuilder')} data-text="Awesome" className="button">
                  <span className="actual-text">&nbsp;Explore&nbsp;</span>
                  <span className="hover-text" aria-hidden="true">&nbsp;Explore.&nbsp;</span>
              </button>
            </div>
            <div className='p-8 hover:bg-gray-800 w-full text-center '>
              <button id='idp' onClick={()=>navigate('/battle')}>
                <span className='text-slate-400'>PLAY NOW</span>
              </button>
            </div>
        </div>
      }
    </div>
  )
}

export default Sidebar
