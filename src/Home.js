import React, { useRef } from 'react'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import './Home.css'
import './components/Buttons/button.css'
import './components/Cards/cards.css'
import './components/Buttons/explorebutton.css'
import {useNavigate} from 'react-router-dom'

const bgimages=[]

function Home() {

  const cards = useRef(['rayquaza-mega', 'charizard-mega', 'necrozma', 'arceus'])
  const navigate = useNavigate();

  return (
    <div className="h-[89.9%] md:bg-slate-800 bg-cover bg-no-repeat bg-[url('https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif')]">
      <div className='h-full w-full flex items-center  overflow-hidden'>
        <div className='mx-24 flex-[0.9] '>
          <div className='text-4xl text-slate-400 w-full my-2 mb-16 '>Welcome to Pokemon Showdown </div>
          <div className='text-2xl w-full text-slate-200 mb-8'>Build a Team</div>
          <div><Link to="/teambuilder">
            <Button id='idt'>
              Teambuilder
            </Button>
          </Link></div>
        </div>
        <div className='ml-14 flex justify-center md:drop-shadow-lg md:h-44 md:w-1/2 md:flex md:justify-center md:wrap md:flex-col md:items-end md:justify-center hidden'>
          
          <div className=''>
            <h1 className='text-slate-400 text-4xl' >Explore, Create, Conquer.</h1>
            <button onClick={()=>navigate('/teambuilder')} data-text="Awesome" className="button">
                <span className="actual-text">&nbsp;Search&nbsp;</span>
                <span className="hover-text" aria-hidden="true">&nbsp;Search.&nbsp;</span>
            </button>
          </div>
          <div className='p-4 m-2 flex justify-center'>
            <button id='idp' onClick={()=>navigate('/battle')}>
              <span className='text-slate-400'>PLAY NOW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

// bg-cover bg-no-repeat bg-[url('https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif')]