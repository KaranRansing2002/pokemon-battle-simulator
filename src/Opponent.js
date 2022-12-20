import React from 'react'

function Opponent(props) {
    const { opphp, opponentPokemon, classp } = props;
  return (
      <div className='h-full w-full flex flex-col justify-center items-center'>
        <div className='text-sm text-white'>{opponentPokemon}</div>
          <div className='h-full w-full flex items-center justify-center'>
                <div className={`h-[15px] ml-4 w-[60%] bg-white border-black border-2 rounded-lg`}>
                    <div className={`w-[${opphp}%] h-full bg-green-400 rounded-lg hpbar`}>
                    </div>
                </div>
                <span className='text-sm h-[15px] border-black border flex items-center rounded bg-slate-400'>{100}%</span>
            </div>
        <img className={`${classp}`} src={`https://play.pokemonshowdown.com/sprites/ani/${opponentPokemon}.gif`}></img>
    </div>
  )
}

export default Opponent
