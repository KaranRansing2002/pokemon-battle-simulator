import React, { useEffect, useState } from 'react'
import bgs from './battleBackgrounds'
import { selMoves } from './Teambuilder';
import './Battle.css' 
import axios from 'axios';
import Player1 from './Player1';
import Opponent from './Opponent';

const imgadd=bgs[Math.floor(Math.random()*bgs.length)];

let pokemonhp = [] 
let pokestats = []
let movestats={}
const baseUrl = 'http://localhost:8000'

let pp=[]

function Battle() {
    const team1=selMoves;
    const team2=selMoves;
    const [classp,setClassp] = useState('')
    const [selectedPokemon,setSelectedPokemon] = useState('charizard')
    const [stats,setStats] = useState([])
    const [hp, setHp] = useState(100)
    const [opponentPokemon, setOpponentPokemon] = useState('')
    const [opphp,setOpphp] = useState(100)
    const [classOpp, setClassOpp] = useState('')
    const [atk, setAtk] = useState(0)
    const [ind, setInd] = useState(-1)
    const [currHp, setCurrHp] = useState(0)
    const [moves, setMoves] = useState([])
    
  useEffect(() => { 
    Object.keys(team1).map(id => {
      pokemonhp.push([team1[id].name,team1[id].stats[0],team1[id].stats[0]]) 
    })
    let arr = [];
    Object.keys(team1).map(id => team1[id].moves.map(move=>move !="" && arr.push(move)));
    // console.log(arr)
    axios.all(arr.map(move => axios.get(`${baseUrl}/moves/${move}`))).then((resp) => {
      resp.map(res => {
        let obj = {};
        obj['PP'] = res.data.PP;
        obj['Category'] = res.data.Category.split("-")[1].split(".")[0];
        obj['Type'] = res.data.Type
        obj['Power'] = res.data.Power
        movestats[res.data.Name]=obj
      })
    })
  },[]) 
    
  useEffect(() => {
    if (ind >= 0) {
      setInterval(() => setClassp('pokemon-rev'), 1000)
      setClassp('scale-0')
      if (pokemonhp.length > 0) setCurrHp(pokemonhp[ind][1] / pokemonhp[ind][2] * 100)
      console.log("pokemonhp",pokemonhp[ind][1])
      // console.log(moves)
    }
  },[ind])
    
  return (
    <div className='h-full w-full'>
      <button onClick={() => { setAtk(20); pokemonhp[ind][1] -= Math.min(pokemonhp[ind][1], 20); setCurrHp(pokemonhp[ind][1]/pokemonhp[ind][2]*100); console.log("data",selectedPokemon,ind,currHp,pokemonhp) } } className='m-2'>Attack</button>
      <button onClick={() => { setOpponentPokemon('rayquaza'); setClassOpp('pokemon-rev') }}>Rayquaza</button>
      <div className={`flex flex-col h-3/5 m-4 w-1/2 border-4 border-black rounded-lg bg-[url(${imgadd})] bg-cover bg-no-repeat`}>
        <div className='h-1/2 w-1/2 self-end flex'>
          {selectedPokemon && <Opponent opphp={opphp} classp={classOpp} opponentPokemon={opponentPokemon} />}
        </div>
        <div className='h-1/2 w-1/2 flex justify-center items-center'>
          {selectedPokemon && <Player1 hp={currHp } ind={ind} classp={classp} selectedPokemon={selectedPokemon} />}
        </div> 
      </div>

      <div className='w-1/2 h-[10%] bg-green-400 mx-4 my-2 flex border-2 border-black'>
        {  
          selectedPokemon.length>0 && moves.map(move => {
            return <div className='w-1/4 border  flex flex-col justify-center items-center'>
              <h3>{move}</h3> 
              <h3>{move.length>0 && movestats[move]["PP"]}</h3>
            </div> 
          })
        }
      </div>
      <div className='w-1/2 h-[10%] bg-green-400 mx-4 flex space-x-[8%]'>
        {
          Object.keys(team1).map((pokemon,index) => {
            // console.log(team1[pokemon].name)
            return <img onClick={() => { setSelectedPokemon(team1[pokemon].name); setInd(index); setMoves(team1[pokemon].moves);setStats(pokestats[ind])}} className='border-2 border-black scale-100 hover:scale-125 hover:cursor-pointer' src={require(`./images/${team1[pokemon].name}.png`)} />
            })
        }
      </div>
    </div>
  )
}

export default Battle
export {pokemonhp}