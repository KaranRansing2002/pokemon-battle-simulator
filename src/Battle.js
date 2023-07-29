import React, { useEffect, useState } from 'react'
import bgs from './battleBackgrounds'
import { selMoves } from './Teambuilder';
import './Battle.css' 
import axios from 'axios';
import Player1 from './Player1';
import Opponent from './Opponent';
import { Button } from '@mui/material';
// import {myTeam} from './MyTeam';
import PokemonSlots from './PokemonSlots';
import io from 'socket.io-client'
import SendIcon from '@mui/icons-material/Send';
import uuid from 'react-uuid';
import Chat from './Chat';

import baseUrl from './url';

const socket= io.connect(baseUrl)

const imgadd=bgs[Math.floor(Math.random()*bgs.length)];

let pokemonhp = [] 
let pokestats = []
let movestats={}
let pokemoninformation = undefined;
let thp = 0;
let pp=[]

let user = localStorage.getItem("userinfo") ?  JSON.parse(localStorage.getItem("userinfo")).username : undefined;

let cnt = 0;

function Battle() {
  // delete myTeam["email"]
  const myTeam = JSON.parse(localStorage.getItem('myteam'));
  const team1 = myTeam === undefined ? selMoves : myTeam;
  const team2 = myTeam === undefined ? selMoves : myTeam;
  // console.log(team1,selMoves);
  const [classp,setClassp] = useState('')
  const [selectedPokemon,setSelectedPokemon] = useState('')
  const [stats,setStats] = useState([])
  const [hp, setHp] = useState(100)
  const [opponentPokemon, setOpponentPokemon] = useState('')
  const [pokemoninfo,setPokemoninfo] = useState({})
  const [opphp,setOpphp] = useState(100)
  const [classOpp, setClassOpp] = useState('')
  const [ind, setInd] = useState(-1)
  const [currHp, setCurrHp] = useState(0)
  const [moves, setMoves] = useState([])
  const [roomid, setRoomId] = useState('123')
  const [oppAttkData, setOppAttkData] = useState(undefined);
  const [turn, setTurn] = useState(1);
    
  useEffect(() => { 
    Object.keys(team1).map(id => {
      pokemonhp.push([team1[id].name,team1[id].stats[0],team1[id].stats[0]]) 
    })
    let arr = [];
    Object.keys(team1).map(id => team1[id].moves.map(move=>move !=="" && arr.push(move)));
    // console.log(arr)
    axios.all(arr.map(move => axios.get(`${baseUrl}/moves/${move}`))).then((resp) => {
      resp.map(res => {
        let obj = {};
        obj['PP'] = res.data.PP;
        obj['Category'] = res.data.Category.split("-")[1].split(".")[0];
        obj['Type'] = res.data.Type
        obj['Power'] = res.data.Power
        obj['Accuracy'] = res.data.Accuracy;
        movestats[res.data.Name]=obj
      })
    })
  }, []) 
  
    
  useEffect(() => {
    if (ind >= 0) {
      setInterval(() => setClassp('pokemon-rev'), 1000)
      setClassp('scale-0')
      if (pokemonhp.length > 0) setCurrHp(pokemonhp[ind][1])
      console.log("pokemonhp", pokemonhp[ind][1])
      thp = pokemonhp[ind][2];
      console.log(moves)
    }
  }, [ind,selectedPokemon])
  
  useEffect(() => {
    if(ind>=0){
      setCurrHp(pokemonhp[ind][1]);
      console.log("currHP", pokemonhp[ind][1]);
      socket.emit("pokemon", { pokemon: selectedPokemon, roomid: roomid ,currHp : pokemonhp[ind][1]/pokemonhp[ind][2]*100})
      pokemoninformation = pokemoninfo
    }
  }, [selectedPokemon])
  
  useEffect(() => {
    if (oppAttkData !== undefined) {
      let data = oppAttkData;
      console.log("opp data", oppAttkData)
      let prob = [];
      let Accuracy = data.moveinfo.Accuracy;
      Accuracy = Accuracy === '∞' ? 100 : parseInt(Accuracy);
      for (let i = 1; i <= 100; i++){
        if (i <= Accuracy) prob.push(1);
        else prob.push(0);
      }   
      let probability = prob[Math.floor(Math.random() * 100)];
      let arr = [1, 1.5];
      let crit = arr[Math.floor(arr.length * Math.random())];
      const stab = 1.5;
      
      let power = data.moveinfo.Power === '—' ? 0 : parseInt(data.moveinfo.Power);
      const attack = data.moveinfo.Category === "physical" ? data.attk : data.spa;
      const defence = data.moveinfo.Category === "physical" ? pokemoninformation.stats[2] : pokemoninformation.stats[4];
      let damage = (0.25 * power * (attack / defence) * crit * stab * thp * probability) / 100;
      damage = Math.min(damage, currHp);
      setCurrHp((oldhp) => oldhp - damage);
      // console.log(currHp, thp, damage);
      pokemonhp[ind][1] -= damage;
      socket.emit("currhp", { hp: (currHp-damage) / thp * 100 ,roomid : roomid});
      // console.log(damage);
    }
  },[oppAttkData])

  useEffect(() => {
    socket.on("opponent_pokemon", (data) => {
      setOpponentPokemon(data.pokemon)
      console.log(data);
      setOpphp(data.currHp)
    })  
    socket.on("opponent_attack", async (data) => {   
      setOppAttkData(data);
    })
    socket.on("opponent_hp", (data) => {
      console.log("hpdata", data);
      setOpphp(data.hp);
    })

    return ()=>socket.removeAllListeners();
  },[socket])

  const handleAttack = (moveinfo) => {
    socket.emit("attack",{moveinfo : moveinfo,attk : pokemoninfo.stats[1],spa : pokemoninfo.stats[3],pokemontype : pokemoninfo.type,roomid : roomid})
  }
  
  return (
    <div className='h-full w-full bg-slate-800 flex'>
      <div className='h-full min-w-auto flex-[1] m-1 '>
        <form className='mt-2' onSubmit={(e) => { e.preventDefault(); roomid !== "" && socket.emit("join_room",roomid)}}><input placeholder='enter room id' className='border-black border-2 ml-4' value={roomid} onChange={(e)=>setRoomId(e.target.value)}></input></form>
        
        {/* game window */}
        <div className={`flex flex-col h-3/5 m-4 w-full border-4 border-black rounded-lg bg-[url(${imgadd})] bg-cover bg-no-repeat`}>
          <span className='border border-black text-black bg-white w-14 text-center m-2'>Turn {turn }</span>
          <div className='h-1/2 w-1/2 self-end flex'>
            {opponentPokemon && <Opponent opphp={opphp} classp={classOpp} opponentPokemon={opponentPokemon} />}
          </div>
          <div className='h-1/2 w-1/2 flex justify-center items-center'>
            {selectedPokemon && <Player1 currhp={currHp} thp={pokemonhp[ind][2]} ind={ind} classp={classp} selectedPokemon={selectedPokemon} />}
          </div> 
        </div>

        {/* moves bar */}
        <div className='w-full h-[12%]  mx-4 my-2 flex border-2 border-black items-center'>
          {  
            selectedPokemon.length>0 && moves.map(move => {
              return (
                <div className='h-[95%] border-black border-2 w-1/4 rounded'>
                  <button class="bg-red-200 hover:bg-red-300 active:bg-red-400 text-black font-bold py-2 px-4 h-full w-full" onClick={()=>handleAttack(movestats[move])}>
                    <h3>{move}</h3> 
                    <h3>{move.length>0 && movestats[move]!==undefined &&  movestats[move]["PP"] && movestats[move]["PP"]}</h3>
                  </button>
                </div>
              ) 
            })     
          }      
        </div> 
        
        {/* pokemons */}
        <div className='h-22 bg-slate-600 w-full mx-4'>
          <PokemonSlots team={myTeam} height={'22'} width={'full'} setSelectedPokemon={setSelectedPokemon} setInd={setInd} setMoves={setMoves} onClickHandle={true} setPokemoninfo={setPokemoninfo} />
        </div>
      </div>
      <div className='h-full w-1/2 '>
        <Chat roomid={roomid} socket={socket} />
      </div>
    </div>
  )
}

export default Battle
export {pokemonhp}