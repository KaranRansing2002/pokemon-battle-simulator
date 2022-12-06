import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Pokedex from './Pokedex';
import Stats from './Stats';
import charmander from './images/charmander.png'

function Teambuilder() {
  const [clicked, setClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamPokemon, setTeamPokemon] = useState('');
  return (
    <div className='h-full bg-green-400'>
      <div className='h-full p-4 '>
        <Button onClick={() => setClicked(!clicked)} variant="contained" color="primary">
          Add Team
        </Button>
        <div className='bg-blue-400 h-full w-full flex'>
          <div className='bg-orange-600 w-3/4'>
            {clicked && <Pokedex sPokemon={setSelectedPokemon} />}
          </div>
          <div className='w-1/4 bg-gradient-to-r from-purple-500 to-pink-500 h-full'>
            <div className='w-full h-12 bg-yellow-400 flex'>
              {
                selectedPokemon.map(pokemon => {
                  return <img onClick={()=>setTeamPokemon(pokemon)} className='scale-125' src={require(`./images/${pokemon.toLowerCase()}.png`)} />
                })
              }
            </div>
            {teamPokemon && <h2 className='w-full text-center'>{teamPokemon}</h2>}
            <div className='w-full h-1/4 flex justify-center'>
              {teamPokemon && <img className='scale-[1.5]' src={require(`./images/charmander.png`)} />}
            </div>
            <div className='h-6 m-4 w-12 text-center border-black border-2 rounded bg-green-400'>Blaze</div>
            <div className='w-full flex justify-center'> 
              <Stats selectedPokemon={selectedPokemon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teambuilder
