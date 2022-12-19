import React, { useEffect, useState } from 'react'
import bgs from './battleBackgrounds'
import { selMoves } from './Teambuilder';
import './Battle.css' 
import axios from 'axios';

const imgadd=bgs[Math.floor(Math.random()*bgs.length)];

function Battle() {
    const team1=selMoves;
    const team2=selMoves;
    const [classp,setClassp] = useState('')
    const [selectedPokemon,setSelectedPokemon] = useState('')
    const [stats,setStats] = useState([])
    const [hp,setHp] = useState(100)

    useEffect(()=>{
      setInterval(()=>{
        setClassp('pokemon-rev')
      },1000)
      setClassp('scale-0')
      if(selectedPokemon.length>0){
        axios.get(`http://localhost:8000/pokemon/${selectedPokemon}`).then((resp)=>{
          console.log(resp)
          setStats(resp.data[0].stats)
        })
      }
      console.log("stats",stats)
    },[selectedPokemon])

  return (
    <div className='h-full w-full'>
      <button onClick={()=>setHp(Math.max(hp-40,0))}>Attack</button>
      <div className={`flex flex-col h-3/5 m-4 w-1/2 border-4 border-black rounded-lg bg-[url(${imgadd})] bg-cover bg-no-repeat`}>
        <div className='h-1/2 w-full flex justify-end '>
            <img className={`${classp} m-10 `} src="https://play.pokemonshowdown.com/sprites/ani/rayquaza.gif"></img>
        </div>
        <div className='h-1/2 w-1/2 flex flex-col justify-center items-center '>
            <div className='h-full w-full flex items-center justify-center'>
              <div className={`h-[15px] ml-4 w-[60%] bg-white border-black border-2 rounded`}>
                <div className={`w-[${hp}%] h-full bg-green-400 hpbar`}>
                </div>
              </div>
              <span className='text-sm h-[15px] border-black border flex items-center rounded bg-slate-400'>{100}%</span>
              </div>
            <img className={`${classp} ml-4 mb-4 max-h-36  object-contain `} src={`https://play.pokemonshowdown.com/sprites/ani-back/${selectedPokemon}.gif`}></img>
        </div>
      </div>

      <div className='w-1/2 h-[10%] bg-green-400 mx-4 my-2'>
        
      </div>
      <div className='w-1/2 h-[10%] bg-green-400 mx-4 flex space-x-[8%]'>
        {
            Object.keys(team1).map(pokemon => {
                console.log(team1[pokemon].name)
                return <img onClick={()=>{setSelectedPokemon(team1[pokemon].name); console.log("clicked")}} className='border-2 border-black scale-100 hover:scale-125' src={require(`./images/${team1[pokemon].name}.png`)} />
            })
        }
      </div>
    </div>
  )
}

export default Battle
