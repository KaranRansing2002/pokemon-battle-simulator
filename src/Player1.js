import React from 'react'
// import { pokemonhp } from './Battle';

function Player1(props) {
    const {classp, selectedPokemon, ind,hp} = props
    // console.log("hp",hp)
    // const hpp = ind<pokemonhp.length && pokemonhp[ind][1] / pokemonhp[ind][2] * 100;
    // console.log(hpp)
    return (
        <div className='h-full w-full '>
            <div className='w-full grid place-items-center'>
                <div className='text-sm text-white'>{selectedPokemon}</div>
                <div className='h-full w-full flex items-center justify-center'>
                    <div className={`h-[15px] ml-4 w-[60%] bg-white border-black border-2 rounded-lg`}>
                        <div className={`w-[${hp}%] h-full bg-green-400 hpbar rounded-lg`}>
                        </div>
                    </div>
                    <span className='text-sm h-[15px] border-black border flex items-center rounded bg-slate-400'>{Math.ceil(hp)}%</span>
                </div>
                <img className={`${classp} max-h-36 mb-4 object-contain `} src={`https://play.pokemonshowdown.com/sprites/ani-back/${selectedPokemon}.gif`}></img>
            </div>
        </div>
    )
}

export default Player1