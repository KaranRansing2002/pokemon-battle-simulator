import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Pokedex from './Pokedex';
import Stats from './Stats';
import charmander from './images/charmander.png'
import Data, {types} from './Data'
import axios from 'axios';
import mew from './images/mew.png'
import { rows } from './Data.js'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import TextField from '@mui/material/TextField';
import moves from './movesdb';
import MoveTable from './MoveTable';
import { createTheme } from "@mui/material/styles";
import { purple, red, green } from "@mui/material/colors";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      light: "#26a69a",
      main: "#009688",
      dark: "#00897b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const baseUrl='http://localhost:8000/pokemon/'

const tryRequire = (path) => {
  try {
    return [require(`${path}`),path];
  } catch (err) {
    return [require("./images/mew.png"),"./images/mew.png"];
  }
};

let selMoves={}

function Teambuilder() {
  const [clicked, setClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [teamPokemon, setTeamPokemon] = useState('');
  const [pokemons, setPokemons] = useState([])
  const [style,setStyle] = useState('hidden')
  const [search,setSearch] = useState('')
  const [moveClick,setMoveClick] = useState(false)
  const [move1,setMove1] = useState('')
  const [move2,setMove2] = useState('')
  const [move3,setMove3] = useState('')
  const [move4,setMove4] = useState('')
  const [currPokemon,setCurrPokemon] = useState(teamPokemon[2])
  const [currInput,setCurrInput] = useState(0)
  const [abil1,setAbil1] = useState('scale-75 bg-slate-900 text-white')
  const [abil2,setAbil2] = useState('scale-75 bg-slate-900 text-white')
  const [abil3,setAbil3] = useState('scale-75 bg-slate-900 text-white')
  const [choosenAbility,setChoosenAbility] = useState('')
  const [validate,setValidate] = useState(false)

  useEffect(() => {
    const url1 = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    axios.get(url1).then((resp) => {
      setPokemons(resp.data.results);
    });
  }, []);
  // console.log("teamPokemon", teamPokemon[2])
  useEffect(() => {
    
    // const urls = [];
    // if(pokemons.length>0){
    //   for (let i = 896; i < 897;i++) {
    //     // console.log(pokemons[i], i)
    //     urls.push(pokemons[i].url)
    //   }
    //   axios.all(urls.map((url) => axios.get(url))).then((res) => {
    //     // console.log("res", res)
    //     for (let i = 0; i < res.length; i++){
    //       const data = res[i].data;
    //       let obj = {}
    //       obj["id"] = i+896;
    //       const rPath = `./images/${data.name.toLowerCase()}.png`;
    //       obj["imageUrl"] = tryRequire(rPath)[1];
    //       obj["name"] = data.name;
    //       let arr = [];
    //       for (let x of data["types"]) {
    //         arr.push(x.type.name)
    //       }
    //       obj["types"] = arr;
    //       arr = [];
    //       for (let x of data["abilities"]) {
    //         arr.push(x.ability.name)
    //       }
    //       obj["abilities"] = arr;
    //       arr = [];
    //       let sum = 0;
    //       for (let x of data['stats']) {
    //         arr.push(x.base_stat);
    //         sum += x.base_stat;
    //       }
    //       arr.push(sum);
    //       obj["stats"] = arr;
    //       console.log(obj);
    //       axios.post('http://localhost:8000/pokemon/add', obj).then((resp) => console.log("data added ", obj.name, i));
    //     }
    //   })
    // }   
  },[pokemons])

  const handleDelete=(index)=>{
    setSelectedPokemon(selectedPokemon.filter((pok,ind) => index!=ind))
    setTeamPokemon('')
  }

  // useEffect(()=>{
  //   for(let i=0;i<moves.length;i++){
  //     let move={};
  //     move["Id"]=i;
  //     let ok=true;
  //     for(let x of Object.keys(moves[i])){
  //       if(x=="Name_URL" || x=="TM" || x=="Type_URL" ){
  //         continue;
  //       }
  //       if((x=="Effect" && moves[i][x].includes("Z-Move")) || (moves[i]["Name"].includes("G-Max")) || (moves[i]["Name"].includes("Max"))){
  //         ok=false;
  //         break;
  //       }
  //       move[x]=moves[i][x];
  //     }
  //     if(!ok){
  //       continue; 
  //     }
  //     move["Pokemon"]=[]
  //     move['Name']=move['Name'].toLowerCase().replaceAll(" ","-");
  //     if(move["Accuracy"]=='—'){
  //       move["Accuracy"] = "∞"
  //     }
  //     axios.get(`https://pokeapi.co/api/v2/move/${move["Name"]}`).then((resp)=>{
  //       if(resp.status==200){
  //         const data = resp.data["learned_by_pokemon"];
  //         move["Pokemon"] = data.map((dat) => dat.name);
  //         // console.log("data",move["Pokemon"]);
  //         axios.post('http://localhost:8000/moves/',move).then(resp=>console.log("data added.",move.Name))
  //       }
  //     })
  //   }
  // },[])

  useEffect(()=>{
    console.log("here",teamPokemon[0]);
    if(Object.keys(selMoves).includes(teamPokemon[0])){
      setMove1(selMoves[teamPokemon[0]].moves[0])
      setMove2(selMoves[teamPokemon[0]].moves[1])
      setMove3(selMoves[teamPokemon[0]].moves[2])
      setMove4(selMoves[teamPokemon[0]].moves[3])
    }
    else{
      setMove1('');
      setMove2('');
      setMove3('');
      setMove4('');
    }
  },[teamPokemon])

  const handleSave=()=>{
    const mmoves = [move1,move2,move3,move4]
    
    let ok=false;
    mmoves.map((mv,ind)=>{
      if(mv!=''){
        ok = true;
        return;
      }
    })
    if(!ok){
      alert("please select atleast one move")
    }
    ok = ok & choosenAbility!=''
    if(!ok){
      alert("please select ability")
    }
    setValidate(ok);
    if(validate){
      selMoves[teamPokemon[0]]={"name" : teamPokemon[2],"moves" : mmoves,"ability" : choosenAbility}; 
      // selMoves["ability"]=choosenAbility
      alert("Saved successfully")
      console.log(selMoves)
    }
  }


  return (
    <div className='h-full bg-slate-800'>
      <div className='h-full p-4'>
        <Data search={search} setSearch={setSearch} teamPokemon={teamPokemon} currPokemon={currPokemon} setCurrPokemon={setCurrPokemon}/>
        <div className="flex w-full">
          <div>
            <Button
              onClick={() => {
                setClicked(!clicked);
                setMoveClick(false);
              }}
              variant="contained"
              color="primary"
            >
              Add Team
            </Button>
          </div>
          <div className="rounded m-2">
            <input
              placeholder="Search Pokemon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <div>
            <Link to="/battle">
              <Button variant="contained" theme={theme} >
                Battle
              </Button>
            </Link>
          </div>
          <div className="ml-2">
            <Button variant="contained" color="primary">
              Ladder
            </Button>
          </div>
          <div className="ml-2">
            <Button variant="contained" color="primary">
              Damage Calculator
            </Button>
          </div>
        </div>
        <div className='bg-blue-900 h-full w-full flex'>
          <div className='h-full bg-orange-600 w-3/4'>
            {clicked && <Pokedex sPokemon={setSelectedPokemon} />}
            {moveClick && <MoveTable teamPokemon={teamPokemon} currInput={currInput} vari={[move1,move2,move3,move4]} func={[setMove1,setMove2,setMove3,setMove4]}/>}
          </div>
          <div className='w-1/4 rounded bg-gradient-to-r from-blue-500 to-green-400 h-full'>
            <div className='w-full h-14 flex justify-center '>
              {
                selectedPokemon.map((pokemon,index) => {
                  return <div onMouseEnter={()=>setStyle('pokemon scale-75 absolute top-0 right-0')} onMouseLeave={()=>setStyle('hidden')} className='h-full w-1/6 border border-slate-900 flex relative cursor-pointer'>
                      <div className='h-full w-full'><img onClick={()=>setTeamPokemon(pokemon)} src={require(`./images/${pokemon[2].toLowerCase()}.png`)} /></div>
                      <div onClick={()=>handleDelete(index)} className={style}><DeleteTwoToneIcon className=''/></div>
                    </div>
                })
              }
            </div>
            {teamPokemon && <h2 className='w-full text-center'>{teamPokemon[2]}</h2>}
            <div className='w-full mt-2 h-[25%] flex justify-center'>
              {teamPokemon && <img className='scale-[1.2]' src={require(`./images/${teamPokemon[2]}.png`)} />}
            </div>
            {
              <div className='w-full mt-2 flex justify-center '>
                <div className='w-full flex justify-center flex-start '>
                  {
                    teamPokemon && teamPokemon[3].split(" | ").map((typs)=>{
                      return <div className={`h-6  text-xs my-4 flex items-center p-2 text-center border-black border-2 rounded bg-[${types[typs]}]`}>{typs}</div>
                    })
                  }
                </div>
                <div className='w-full flex justify-center flex-end'>
                  {
                    teamPokemon && teamPokemon[4].split(" | ")[0] && <div onClick={()=>{setAbil1('bg-slate-100'); setChoosenAbility(teamPokemon[4].split(" | ")[0]); setAbil2('scale-75 bg-slate-900 text-white'); setAbil3('scale-75 bg-slate-900 text-white')}} className={`h-6 truncate text-xs my-4 flex items-center  text-center border-black border-2 rounded cursor-pointer ${abil1}`}>{teamPokemon[4].split(" | ")[0]}</div>
                  }
                  {
                    teamPokemon && teamPokemon[4].split(" | ")[1] && <div onClick={()=>{setAbil2('bg-slate-100'); setChoosenAbility(teamPokemon[4].split(" | ")[1]); setAbil1('scale-75 bg-slate-900 text-white'); setAbil3('scale-75 bg-slate-900 text-white')}} className={`h-6 truncate text-xs my-4 flex items-center  text-center border-black border-2 rounded cursor-pointer ${abil2}`}>{teamPokemon[4].split(" | ")[1]}</div>
                  }
                  {
                    teamPokemon && teamPokemon[4].split(" | ")[2] && <div onClick={()=>{setAbil3('bg-slate-100'); setChoosenAbility(teamPokemon[4].split(" | ")[2]); setAbil2('scale-75 bg-slate-900 text-white'); setAbil1('scale-75 bg-slate-900 text-white')}} className={`h-6 truncate text-xs my-4 flex items-center  text-center border-black border-2 rounded cursor-pointer ${abil3}`}>{teamPokemon[4].split(" | ")[2]}</div>
                  }
                </div>
                
              </div>
            }
            <div className='w-full flex justify-center'> 
              {teamPokemon && <Stats selectedPokemon={teamPokemon} />}
            </div> 
            {
             teamPokemon && <div className='w-full flex flex-col items-center '>
                <input value={move1} onChange={(e)=>setMove1(e.target.value)} onClick={()=>{setClicked(false); setMoveClick(true); setCurrInput(0)}} className='w-5/6 mt-1 border rounded' placeholder='move1'></input>
                <input value={move2} onChange={(e)=>setMove2(e.target.value)} onClick={()=>{setClicked(false); setMoveClick(true); setCurrInput(1)}} className='w-5/6 mt-1 border rounded' placeholder='move2'></input>
                <input value={move3} onChange={(e)=>setMove3(e.target.value)} onClick={()=>{setClicked(false); setMoveClick(true); setCurrInput(2)}} className='w-5/6 mt-1 border rounded' placeholder='move3'></input>
                <input value={move4} onChange={(e)=>setMove4(e.target.value)} onClick={()=>{setClicked(false); setMoveClick(true); setCurrInput(3)}} className='w-5/6 mt-1 border rounded' placeholder='move4'></input>
                <div className=''><Button onClick={()=>handleSave()} variant="contained">Save</Button></div>
              </div> 
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teambuilder
export {selMoves}