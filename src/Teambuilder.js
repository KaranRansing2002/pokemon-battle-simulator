import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Pokedex from './Pokedex';
import Stats from './Stats';

function Teambuilder() {
  const [clicked,setClicked] = useState(false);
  return (
    <div className='h-full'>
        <div className='h-full p-4'>
          <Button onClick={()=>setClicked(!clicked)} variant="contained" color="primary">
            Add Team  
          </Button>
          {clicked && <Pokedex />}
          <Stats/>
        </div>
    </div>
  )
}

export default Teambuilder
