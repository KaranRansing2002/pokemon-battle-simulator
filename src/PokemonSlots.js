import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react'

function PokemonSlots(props) {
  const team = props.team
  delete team["email"]
  let arr = Object.keys(team);
  const height = props.height
  const width=props.width
  const {setSelectedPokemon,setInd,setMoves,onClickHandle,setPokemoninfo} = props
  const stats = ["hp", "atk", "def", "spa", "spd", "spe", "bst"]
    
    return (
        <div className={`h-${height==undefined ? 'auto' : height} w-${width!=undefined ? width : '[55%]'} ${props.colors} border-black border-2 flex justify-center items-center`} >
      {
        arr.map((id,index)=>{
            return (
              <Tooltip key={index} title={`${team[id].name} 
                ${team[id].stats.map((st,index) => (stats[index]+"="+st))}`}>
                <div key={index} className={`h-[94%] w-1/6 border-black border bg-green-200 m-1 hover:scale-[1.11]`} onClick={onClickHandle != undefined && (() => { setSelectedPokemon(team[id].name); setInd(index); setMoves(team[id].moves); setPokemoninfo(team[id]); console.log("teamid",team[id])})}>
                    <img className={`h-auto w-[80%]  object-cover	`} src={require(`./images/${team[id].name}.png`)}></img>
                </div></Tooltip>
            )
        })
      }
    </div>
  )
}

export default PokemonSlots
