import React, { useEffect, useState } from 'react'

const arr = ['hp', 'atk', 'def', 'spa', 'spd', 'spe', 'bst']

const Statbox = ({ pokemon }) => {


    const [stats, setStats] = useState({})

    useEffect(() => {
        if (pokemon) {
            let stat = {}
            for (let x of arr) {
                if (x === 'bst')
                    stat[x] = pokemon[x]/720*100
                else stat[x] = pokemon[x]/255*100
            }
            setStats(stat)
            // console.log(stat)
        }
    }, [pokemon])

    if (!pokemon) return <></>

    return (
        <div className='bg-[#343434] grid grid-cols-6 p-1 gap-2'>
            <div className='col-span-1 grid gap-1'>
                {
                    arr.map((stat, index) => (
                        <h2 className='text-blue-400 bg-[#1E2021] pl-3 text-xs' key={index}>{stat}</h2>
                    ))
                }
            </div>
            <div className='grid col-span-4 place-items-center'>
                {
                    arr.map((stat, index) => (
                        <div key={index} className='bg-[#1E2021] h-2 rounded w-full border border-slate-500'><div className={`rounded border-black border h-2 w-[${stats[stat]}%] bg-green-400 transition-width duration-500 ease-linear `}></div></div>
                    ))
                }
            </div>
            <div className='col-span-1 grid gap-1'>
                {
                    arr.map((stat, index) => (
                        <h3 key={index} className='text-xs bg-[#1E2021] pl-3'>{pokemon[stat]}</h3>
                    ))
                }
            </div>
        </div>
    )
}

export default Statbox
