import React, { useEffect, useRef, useState } from 'react'
import Pokedex from './Pokedex'
import { Button, Snackbar, TextField, Tooltip } from '@mui/material'
import { types } from '../../helper/types'
import Statbox from '../../components/Statbox'
import MovesTable from './MovesTable'
import SnackBar from '../../components/SnackBar'
import axios from 'axios'
import api from '../../helper/api'
import { v4 as uuid } from 'uuid';


const TeamBuilder = () => {
  const [selectedPokemons, setSelectedPokemons] = useState(() => localStorage.getItem('team') ? JSON.parse(localStorage.getItem('team')) : [])
  const [selectedPokemon, setSelectedPokemon] = useState(undefined);
  const [selectedMoves, setSelectedMoves] = useState(() => (!selectedPokemon ? [] : selectedPokemon.moves))
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState('')
  const [severity, setSeverity] = useState('success')

  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(selectedPokemons))
    if (selectedPokemons.length > 0 && (selectedPokemon === undefined || (!selectedPokemons.includes(selectedPokemon))))
      setSelectedPokemon(selectedPokemons[0])
    if (selectedPokemons.length === 0)
      setSelectedPokemon(undefined)
  }, [selectedPokemons])

  useEffect(() => {
    if (selectedPokemon) {
      const team = selectedPokemons.map((p) => {
        if (p.name === selectedPokemon.name) {
          p.moves = [...selectedMoves]
        }
        return p
      })
      // localStorage.setItem('team', JSON.stringify(team)) 
      setSelectedPokemons([...team])
    }
  }, [selectedMoves])

  useEffect(() => {
    if (selectedPokemon) {
      setSelectedMoves(selectedPokemon.moves ? [...selectedPokemon['moves']] : [])
    }
  }, [selectedPokemon])

  const handleAbility = (ability) => {
    const team = selectedPokemons.map(p => {
      if (p.name === selectedPokemon.name) {
        p.ability = ability
      }
      return p
    })
    setSelectedPokemons([...team]);
  }

  console.log(types);

  const handleSave = async () => {
    let isVaildTeam = true;
    if (selectedPokemons.length === 0) isVaildTeam = false;
    let reason = ''
    for (let x of selectedPokemons) {
      if (!x.moves || x.moves.length === 0) {
        isVaildTeam = false;
        reason = `${x.name}'s moves not added !`
        break;
      }
    }
    if (isVaildTeam) {
      try {
        const teamid = selectedPokemons[0].teamid ? selectedPokemons[0].teamid : uuid();
        const resp = await axios.post(`${api}/user/team`, { id: teamid, team: [...selectedPokemons] }, {
          withCredentials: true
        })
        if (resp.data.successfull) {
          setSeverity('success');
          setTitle('saved successfully visit myteams to see more')
        }
      } catch (error) {
        setSeverity('error')
        setTitle(error.message)
      }
    }
    else {
      setTitle(reason)
      setSeverity('error')
    }
    // console.log(title,severity)
  }

  return (
    <div className=' h-full grid place-items-center'>
      <div className='h-full'>
        <div className="p-2 text-white h-full flex-grow">
          <div className="grid sm:grid-cols-3 grid-cols-1 grid-rows-2 sm:grid-rows-1 gap-4 h-full">
            <div className="sm:col-span-2 flex flex-col bg-[#1E2021] h-full">
              <div className="flex-grow h-full">
                {toggle ? <MovesTable pokemon={selectedPokemon} selectedMoves={selectedMoves} setSelectedMoves={setSelectedMoves} /> : <Pokedex setSelectedPokemons={setSelectedPokemons} selectedPokemons={selectedPokemons} />}
              </div>
            </div>
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
                              <div key={ind} className={`h-6  text-xs my-4 flex items-center justify-center p-2  border-black border-2 text-black uppercase rounded-md `} style={{ backgroundColor: types[type] }}>{type}</div>
                            ))
                          }
                        </div>
                        <div className='flex flex-col gap-2'>
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
                        selectedMoves.map((move, index) => (
                          <Button variant='contained' size='small' sx={{
                            backgroundColor: '#4ADE80', color: 'black', '&:hover': {
                              backgroundColor: '#4ADE80',
                            },
                          }} key={index}>{move.Name}</Button>
                        ))
                      }
                    </div>
                    <div className='flex justify-center gap-2'>
                      <Button variant='contained' size='small' onClick={() => setToggle(p => !p)}>{toggle ? 'back to Pokemons' : 'Add Moves'}</Button>
                      <div onClick={handleSave}>{<SnackBar title={title} severity={severity} />}</div>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TeamBuilder
