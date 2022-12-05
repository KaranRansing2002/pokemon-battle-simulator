import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Pokedex from './Pokedex';
import Stats from './Stats';

function Teambuilder() {
  const [clicked, setClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  return (
    <div className='h-full'>
        <div className='h-full p-4'>
          <Button onClick={()=>setClicked(!clicked)} variant="contained" color="primary">
            Add Team  
          </Button>
        {clicked && <Pokedex sPokemon={setSelectedPokemon} />}
        <h3>{selectedPokemon}</h3>
        <Stats selectedPokemon={selectedPokemon} />
        </div>
    </div>
  )
}

export default Teambuilder
