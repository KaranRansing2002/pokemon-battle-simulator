import React from 'react'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import './Home.css'

const bgimages=[]

function Home() {
  return (
    <div className="h-[89.9%] bg-slate-800  ">
      <div className='h-full w-full flex items-center justify-center overflow-hidden'>
        <div className='mx-24 flex-1 '>
          <div className='text-4xl text-slate-400 w-full my-2 '>Welcome to Pokemon Show Down </div>
          <div className='text-2xl w-full text-slate-200'>Build a Team</div>
          <div><Link to="/teambuilder">
            <Button variant="contained" disableElevation>
              Teambuilder
            </Button>
          </Link></div>
        </div>
        <div className='drop-shadow-lg h-[55%] mx-8 flex-2 w-1/2 border-4'>
          <div className='h-full  bg-green-400 bg-cover bg-no-repeat bg-[url("https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif")]'></div>
        </div>
      </div>
    </div>
  )
}

export default Home

// bg-cover bg-no-repeat bg-[url('https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif')]