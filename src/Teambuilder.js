import React from 'react'
import Button from '@mui/material/Button';
import Pokedex from './Pokedex';

function Teambuilder() {
  return (
    <div className='h-full'>
        <div className='h-full p-4'>
          <Button variant="contained" color="primary">
            Add Team  
          </Button>
          <Pokedex/>
        </div>
    </div>
  )
}

export default Teambuilder
