import React from 'react'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';


function Home() {
  return (
    <div className='flex items-center justify-center h-full'>
      <Link to='/teambuilder'>
        <Button variant="contained" disableElevation>
            Teambuilder
        </Button>
      </Link>
    </div>
  )
}

export default Home
