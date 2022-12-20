import React, { useEffect, useState } from 'react'
import bgs from './battleBackgrounds'
import { selMoves } from './Teambuilder';
import './Battle.css' 
import axios from 'axios';
import Player1 from './Player1';
import Opponent from './Opponent';
import { set } from 'lodash';

const imgadd=bgs[Math.floor(Math.random()*bgs.length)];

let pokemonhp = [] 
let pokeind={}

function Battle() {
    const team1=selMoves;
    const team2=selMoves;
    const [classp,setClassp] = useState('')
    const [selectedPokemon,setSelectedPokemon] = useState('')
    const [stats,setStats] = useState([])
    const [hp, setHp] = useState(100)
    const [opponentPokemon, setOpponentPokemon] = useState('')
    const [opphp,setOpphp] = useState(100)
    const [classOpp, setClassOpp] = useState('')
    const [atk, setAtk] = useState(0)
  const [ind, setInd] = useState(0)
  const [currHp,setCurrHp] = useState(0)

    useEffect(()=>{
      setInterval(()=>{
        setClassp('pokemon-rev')
      },1000)
      setClassp('scale-0')
      if(selectedPokemon.length>0){
        axios.get(`http://localhost:8000/pokemon/${selectedPokemon}`).then((resp)=>{
          console.log(resp)
          setStats(resp.data[0].stats)
          if (!Object.keys(pokeind).includes(selectedPokemon)) {
            pokeind[selectedPokemon] = pokemonhp.length;
            console.log(stats)
            pokemonhp.push([selectedPokemon, resp.data[0].stats[0], resp.data[0].stats[0]]);
          }
          // setInd(pokeind[selectedPokemon])
          // console.log(ind,pokemonhp)
          setCurrHp(pokemonhp[ind][1]/pokemonhp[ind][2]*100)
        })
        
      }
      
      // console.log("stats",stats)
    },[selectedPokemon])
    console.log("data",selectedPokemon,ind,currHp,pokemonhp)
  return (
    <div className='h-full w-full'>
      <button onClick={() => { setAtk(20); pokemonhp[ind][1] -= Math.min(pokemonhp[ind][1], 20); setCurrHp(pokemonhp[ind][1]/pokemonhp[ind][2]*100) } } className='m-2'>Attack</button>
      <button onClick={() => { setOpponentPokemon('rayquaza'); setClassOpp('pokemon-rev') }}>Rayquaza</button>
      <div className={`flex flex-col h-3/5 m-4 w-1/2 border-4 border-black rounded-lg bg-[url(${imgadd})] bg-cover bg-no-repeat`}>
        <div className='h-1/2 w-1/2 self-end flex'>
          {selectedPokemon && <Opponent opphp={opphp} classp={classOpp} opponentPokemon={opponentPokemon} />}
        </div>
        <div className='h-1/2 w-1/2 flex justify-center items-center'>
          {selectedPokemon && <Player1 hp={currHp } ind={pokeind[selectedPokemon]} classp={classp} selectedPokemon={selectedPokemon} />}
        </div>
      </div>

      <div className='w-1/2 h-[10%] bg-green-400 mx-4 my-2'>
        
      </div>
      <div className='w-1/2 h-[10%] bg-green-400 mx-4 flex space-x-[8%]'>
        {
          Object.keys(team1).map((pokemon,index) => {
            // console.log(team1[pokemon].name)
            return <img onClick={() => { setSelectedPokemon(team1[pokemon].name);setInd(index)}} className='border-2 border-black scale-100 hover:scale-125' src={require(`./images/${team1[pokemon].name}.png`)} />
            })
        }
      </div>
    </div>
  )
}

export default Battle
export {pokemonhp}