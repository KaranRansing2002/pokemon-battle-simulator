import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react'

function PokemonSlots(props) {
    const team = props.team
    let arr = Object.keys(team);
    arr = arr.slice(0, arr.length - 1)

    const stats = ["hp", "atk", "def", "spa", "spd", "spe", "bst"]
    
    return (
        <div className={`h-auto w-full ${props.colors} border-black border-2 w-[55%] flex justify-center items-center`} >
      {
        arr.map(id=>{
            return (
                <Tooltip title={`${team[id].name} 
                ${team[id].stats.map((st,index) => (stats[index]+"="+st))}`}>
                <div className='h-auto w-1/6 border-black border bg-green-200 m-1 hover:scale-[1.11]'>
                    <img className='h-auto w-auto object-fit contain ' src={require(`./images/${team[id].name}.png`)}></img>
                </div></Tooltip>
            )
        })
      }
    </div>
  )
}

export default PokemonSlots
