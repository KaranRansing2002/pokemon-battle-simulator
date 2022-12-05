import React from "react";
import rows from './Data'

const stats = [
    {
        name: "HP",
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
    for (let i = 0; i < stats.length; i++){
        stats[i].value = rows[ind][i + 4];
        stats[i].value = stats[i].value / 200 * 100;
    }
  return (
      <div className="h-1/4 w-1/4 bg-[#202225] flex items-center">
          <div className='w-full'>
            {
                  stats.map((stat) => {
                      return (
                        <div className="h-full w-full flex">
                              <h2 className="text-white text-sm">{ stat.name }</h2>  
                              <div className={`h-2 m-2 w-[${stat.value}%] bg-green-600 rounded`} ></div>
                        </div>
                      )
                  })
            } 
          </div>  
      </div>
  );
}

export default Stats;
