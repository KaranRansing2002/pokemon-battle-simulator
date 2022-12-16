import React from 'react'
import bgs from './battleBackgrounds'
import { selMoves } from './Teambuilder';

const imgadd=bgs[Math.floor(Math.random()*bgs.length)];

function Battle() {
    const team1=selMoves;
    const team2=selMoves;
    console.log("team",team1)
  return (
    <div className='h-full w-full'>
      <div className={`flex flex-col h-3/5 m-4 w-1/2 border-4 border-black rounded-lg bg-[url(${imgadd})] bg-cover bg-no-repeat`}>
        <div className='h-1/2 w-full flex justify-end '>
            <img className='' src="https://play.pokemonshowdown.com/sprites/ani/rayquaza-mega.gif"></img>
        </div>
        <div className='h-1/2 w-full flex items-end '>
            <img className='' src="https://play.pokemonshowdown.com/sprites/ani-back/rayquaza.gif"></img>
        </div>
      </div>

      <div className='w-1/2 h-[10%] bg-green-400 mx-4 my-2'>
        
      </div>
      <div className='w-1/2 h-[10%] bg-green-400 mx-4 flex space-x-12'>
        {
            Object.keys(team1).map(pokemon => {
                console.log(team1[pokemon].name)
                return <img className='bg-blue-400 scale-100  ' src={require(`./images/${team1[pokemon].name}.png`)} />
            })
        }
      </div>
    </div>
  )
}

export default Battle
