import React, { useEffect, useState } from 'react';
import './RenderPokemon.css';
import { Tooltip } from '@mui/material';

function RenderPokemon({ pokemon, ToolTip, front }) {
  const [hp, setHp] = useState(0);
  const [scale, setScale] = useState('');

  useEffect(() => {
    setHp((pokemon.currHp / pokemon.hp * 100).toFixed(2));
  }, [pokemon.currHp]);
  
  useEffect(() => {
    setScale('scaled')
  }, [pokemon.name])

  useEffect(() => {
    if (pokemon.currHp <= 0)
      setScale('dead');
  },[pokemon.currHp])

  return (
    <div className={`grid place-items-center p${front ? 'l' : 'r'}-16`} >
      <div className='flex flex-col gap-1 items-center'>
        <div className='flex items-center'>
          <div className={`border-2 border-black rounded-lg bg-white sm:w-40 w-24 h-3 ${front ? 'ml-[-1rem]' : 'ml-8'} `}>
            <div className={`h-full border-r border-black rounded-lg bg-green-500 transition-width ease-in-out duration-500`} style={{width : `${hp}%`}}></div>
          </div>
          <div className='text-xs text-bold'>{hp}%</div>
        </div>
        <div >
          <Tooltip arrow placement={front ? "left" : "right"} title={<ToolTip pokemon={pokemon} />}>
            <img
              src={`https://play.pokemonshowdown.com/sprites/ani${front ? '' : '-back'}/${pokemon.name}.gif`}
              className={` pokemon-image ${scale}  sm:h-auto h-24`}
              alt={pokemon.name}
              key={pokemon.name}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default RenderPokemon;
