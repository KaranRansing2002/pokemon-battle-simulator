import { Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SnackBar from '../../components/SnackBar';
import Statbox from '../../components/Statbox';
import { types } from '../../helper/types';

function Team({ selectedPokemons }) {

    const [selectedPokemon, setSelectedPokemon] = useState(selectedPokemons[0])
    
    useEffect(() => {
        setSelectedPokemon(selectedPokemons[0])
    },[selectedPokemons])

    return (
        <div className="sm:col-span-1 bg-[#1E2021] rounded-md flex flex-col gap-2 p-2">
            {
                selectedPokemon &&
                <>
                    <div className='grid grid-cols-6 gap-2'>
                        {
                            selectedPokemons.map((pokemon, ind) => (
                                <Tooltip title={pokemon.name} key={ind}>
                                    <div className='bg-[#343434] hover:border hover:border-black cursor-pointer' onClick={() => { setSelectedPokemon(pokemon); }}>
                                        <img src={`https://raw.githubusercontent.com/KaranRansing2002/pokemon-battle-simulator/old_version/src/images/${pokemon.name}.png`} />
                                    </div>
                                </Tooltip>
                            ))
                        }
                    </div>

                    <div className=''>
                        <div className='grid grid-cols-5 w-full gap-2'>
                            <div className='w-full grid place-items-center col-span-2 p-2 bg-[#343434]'><img src={`https://play.pokemonshowdown.com/sprites/ani/${selectedPokemon.name.split('-')[0]}.gif`} className='' /></div>
                            <div className='flex flex-col gap-2 p-2 col-span-3 bg-[#343434]'>
                                <h2 className='text-xl font-bold text-green-400'>{selectedPokemon.name}</h2>
                                <div className='flex gap-2'>
                                    {
                                        selectedPokemon.types.map((type, ind) => (
                                            <div key={ind} className={`h-6  text-xs my-4 flex items-center justify-center p-2  border-black border-2 text-black uppercase rounded-md `} style={{backgroundColor: types[type]}}>{type}</div>
                                        ))
                                    }
                                </div>
                                <div className='flex flex-col gap-2 text-white'>
                                    <h2>choose ability</h2>
                                    <div className='flex flex-wrap gap-2'>
                                        {
                                            selectedPokemon.abilities.map((ability, ind) => (
                                                <Button key={ind} size='small' variant={selectedPokemon.ability === ability ? 'contained' : 'outlined'} onClick={() => handleAbility(ability)} sx={{ color: 'white' }}>{ability}</Button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <Statbox pokemon={selectedPokemon} />
                    </div>

                    <div className='grid gap-1 place-items-center bg-[#343434] p-2 flex-grow '>
                        <h3 className='text-xs uppercase font-semibold text-slate-400 text-center'>Select Atleast 1 Move</h3>
                        <div className='grid grid-cols-2 gap-2 w-full px-2 md:px-4 '>
                            {
                                selectedPokemon.moves.map((move, index) => (
                                    <Button variant='contained' size='small' sx={{
                                        backgroundColor: '#4ADE80', color: 'black', '&:hover': {
                                            backgroundColor: '#4ADE80',
                                        },
                                    }} key={index}>{move.Name}</Button>
                                ))
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Team
