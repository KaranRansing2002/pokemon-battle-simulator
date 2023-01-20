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


const socket= io.connect("http://localhost:8000")

const imgadd=bgs[Math.floor(Math.random()*bgs.length)];

let pokemonhp = [] 
let pokestats = []
let movestats={}
const baseUrl = 'http://localhost:8000'

let pp=[]

let user = localStorage.getItem("userinfo") ?  JSON.parse(localStorage.getItem("userinfo")).username : undefined;

let cnt = 0;

function Battle() {
  // delete myTeam["email"]
  const myTeam = JSON.parse(localStorage.getItem('myteam'));
  const team1 = myTeam == undefined ? selMoves : myTeam;
  const team2 = myTeam == undefined ? selMoves : myTeam;
  // console.log(team1,selMoves);
  const [classp,setClassp] = useState('')
  const [selectedPokemon,setSelectedPokemon] = useState('')
  const [stats,setStats] = useState([])
  const [hp, setHp] = useState(100)
  const [opponentPokemon, setOpponentPokemon] = useState('')
  const [pokemoninfo,setPokemoninfo] = useState({})
  const [opphp,setOpphp] = useState(100)
  const [classOpp, setClassOpp] = useState('')
  const [atk, setAtk] = useState(0)
  const [ind, setInd] = useState(-1)
  const [currHp, setCurrHp] = useState(0)
  const [moves, setMoves] = useState([])
  const [message, setMessage] = useState('')
  const [messagesStack, setMessagesStack] = useState([])
  const [roomid,setRoomId] = useState('')
    
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
  }, [ind])

/////////////////////////////////////////socket////////////////////////////////////
  const handleMessage = async(e) => {
    e.preventDefault();
    await socket.emit("send_message", { message: [user , message],roomid : roomid})
    setMessagesStack((oldarr)=>[...oldarr,[user , message]])
    console.log("me",messagesStack.length)
    setMessage('');
  }

  useEffect(() => {
    console.log("rendered component here")
    socket.on("receive_message",(data) => {
      console.log("data", data);
      setMessagesStack((oldarr) => [...oldarr, data.message]);
      // console.log(messagesStack)
    })  
    socket.on("opponent_pokemon", (data) => {
      setOpponentPokemon(data.pokemon)
    })
    socket.on("opponent_hp", (data) => {
      setOpphp(data.currhp) 
    })
    socket.on("opponent_attack", (data) => {
      let arr = [1, 1.5];
      let crit = arr[Math.floor(arr.length * Math.random())];
      const stab = 1.5;
      console.log("pokemoninfo",pokemoninfo,data)
      const attack = data.moveinfo.Category === "physical" ? data.attk : data.spa;
      const defence = data.moveinfo.Category === "physical" ? pokemoninfo.stats[2] : pokemoninfo.stats[4];
      let damage = (0.25 * data.moveinfo.Power * (attack / defence) * crit * stab * currHp) / 100;
      damage = Math.min(damage, currHp);
      console.log("damage",damage)
      setCurrHp((oldhp) => oldhp - damage);
    })
  }, [socket])

  const socketSelectPokemon = async () => {
    await socket.emit("pokemon",{pokemon : selectedPokemon,roomid : roomid})
  }
  useEffect(() => {
    socketSelectPokemon();
  }, [selectedPokemon])

  const socketCurrHp = async () => {
    await socket.emit("currhp",{currhp : currHp,roomid : roomid})
  }
  useEffect(() => {
    socketCurrHp();
  })

  const handleAttack = async (moveinfo) => {
    console.log(pokemoninfo);
    await socket.emit("attack",{moveinfo : moveinfo,attk : pokemoninfo.stats[1],spa : pokemoninfo.stats[3],pokemontype : pokemoninfo.type,roomid : roomid})
    // console.log("myteam",myTeam)
  }
////////////////////////////////////////socket-end////////////////////////////////////
  
  useEffect(() => {
    if(messagesStack.length>0)console.log("messagesStack",messagesStack)  
  },[messagesStack])
  
  return (
    <div className='h-full w-full md:flex bg-slate-800'>
      <div className='h-full min-w-auto flex-[1] m-1 '>
        <form className='inline' onSubmit={(e) => { e.preventDefault(); roomid !== "" && socket.emit("join_room",roomid)}}><input placeholder='enter room id' className='border-black border-2 ml-4' value={roomid} onChange={(e)=>setRoomId(e.target.value)}></input></form>
        <button onClick={() => { setAtk(20); pokemonhp[ind][1] -= Math.min(pokemonhp[ind][1], 20); setCurrHp(pokemonhp[ind][1]/pokemonhp[ind][2]*100); console.log("data",selectedPokemon,ind,currHp,pokemonhp) } } className='m-2'>Attack</button>
        <button onClick={() => { setOpponentPokemon('rayquaza'); setClassOpp('pokemon-rev') }}>Rayquaza</button>
        <div className={`flex flex-col h-3/5 m-4 w-full border-4 border-black rounded-lg bg-[url(${imgadd})] bg-cover bg-no-repeat`}>
          <div className='h-1/2 w-1/2 self-end flex'>
            {opponentPokemon && <Opponent opphp={opphp} classp={classOpp} opponentPokemon={opponentPokemon} />}
          </div>
          <div className='h-1/2 w-1/2 flex justify-center items-center'>
            {selectedPokemon && <Player1 hp={currHp} ind={ind} classp={classp} selectedPokemon={selectedPokemon} />}
          </div> 
        </div>
  
        <div className='w-full h-[12%]  mx-4 my-2 flex border-2 border-black items-center'>
          {  
            selectedPokemon.length>0 && moves.map(move => {
              return (
                <div className='h-[95%] border-black border-2 w-1/4 rounded'>
                  <button class="bg-red-200 hover:bg-red-300 active:bg-red-400 text-black font-bold py-2 px-4 h-full w-full" onClick={()=>handleAttack(movestats[move])}>
                    <h3>{move}</h3> 
                    <h3>{move.length>0 && movestats[move]["PP"] && movestats[move]["PP"]}</h3>
                  </button>
                </div>
              ) 
            })     
          }      
        </div>   
        <div className='h-22 bg-slate-600 w-full mx-4'>
          <PokemonSlots team={myTeam} height={'22'} width={'full'} setSelectedPokemon={setSelectedPokemon} setInd={setInd} setMoves={setMoves} onClickHandle={true} setPokemoninfo={setPokemoninfo } />
        </div>
      </div>
      <div className='h-[95%] w-[45%] m-8 bg-[#212121] border-2 border-black flex flex-col items-center'>
        <div className='h-42 w-[98%] m-2 border-black border-2 flex-1'>
          {
            messagesStack.map((mesobj,index) => (
              <div key={index} className='m-2 text-white h-auto'><span className={user===mesobj[0] ? 'text-green-400' : 'text-red-600'}>{mesobj[0]}</span>: {mesobj[1]}</div>
            ))
          }
        </div>
        <div className='h-auto w-full'>
          <form className='h-42 w-full flex items-center self-place-end' onSubmit={(e)=>handleMessage(e)}>
            <input placeholder='enter message' value={message} onChange={(e)=>setMessage(e.target.value)} className='border-black border-2 m-2 w-[80%]'></input>
            <Button onClick={handleMessage} variant="outlined" endIcon={<SendIcon />}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Battle
export {pokemonhp}