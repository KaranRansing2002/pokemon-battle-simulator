import React from "react";
import {rows} from './Data'

const stats = [
    {
        name: "HP.",
        value: 0,
    },
    {
        name: "Atk",
        value: 0
    },
    {
        name: "Def",
        value: 0
    },
    {
        name: "Spa",
        value: 0
    },
    {
        name: "Spd",
        value: 0
    },
    {
        name: "Spe",
        value: 0
    },
]

function Stats(props) {
    const pokemon = props.selectedPokemon;
    let ind = 0;
    for (let i = 0; i < rows.length; i++){
        if (rows[i][1] == pokemon) {
            ind = i;
            break;
        }
    }
    // console.log(rows[ind])
    for (let i = 0; i < stats.length; i++){
        stats[i].value = rows[ind][i + 4];
        stats[i].value = stats[i].value / 200 * 100;
    }
  return (
      <div className="h-1/4 w-[90%] bg-[#202225] flex items-center justify-center">
          <div className='w-[90%]'>
            {
                  stats.map((stat) => {
                      return (
                        <div className="h-full w-full flex space-even ">
                              <h2 className="text-white text-sm">{stat.name}</h2> 
                              <div className="h-full w-full m-2 bg-white rounded border-white">
                                <div className={`h-2 w-[${stat.value}%] bg-green-600 rounded `} ></div>
                              </div>
                              <h2 className="text-white text-sm ">{stat.value*2}</h2>
                        </div>
                      )
                  })
            } 
          </div>  
      </div>
  );
}

export default Stats;
