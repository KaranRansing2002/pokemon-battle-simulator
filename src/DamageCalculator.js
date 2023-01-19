import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { rows } from "./Data";

// const arr=["Pokemon Name", "Pokemon Type", "Opponent Pokemon Name", "Opponent Pokemon Type", "Opponent HP"]

let rrows=[]

function ShowHideDiv1() {
  const phy = document.getElementById("physical");
  const sp = document.getElementById("special");
  const phyAttack = document.getElementById("physicalAttack");
  const spAttack = document.getElementById("specialAttack");
  phyAttack.style.display = phy.checked ? "block" : "none";
  spAttack.style.display = sp.checked ? "block" : "none";
}

function ShowHideDiv2() {
  const phy = document.getElementById("physical2");
  const sp = document.getElementById("special2");
  const phyAttack = document.getElementById("physicalDefense");
  const spAttack = document.getElementById("specialDefense");
  phyAttack.style.display = phy.checked ? "block" : "none";
  spAttack.style.display = sp.checked ? "block" : "none";
}

let power = 110;
let attk = 112;
let SpAttk = 85;
let def = 90;
let SpDef = 90;
let arr = [1, 1.5];
let crit = arr[Math.floor(arr.length * Math.random())];
let stab = 1.5;
let type = 1;
let hp = 105;
let category = "Physical";
let formula1, formula2;
formula1 = (0.25 * power * (attk / def) * crit * stab * type * hp) / 100;
formula2 = (0.25 * power * (SpAttk / SpDef) * crit * stab * type * hp) / 100;
console.log(formula2);

function calculate1(power, attk, def, crit, stab, type, hp) {
  return formula1;
}
function calculate2(power, SpAttk, SpDef, crit, stab, type, hp) {
  return formula2;
}
const move = category === "Physical" ? formula1 : formula2;
// console.log(move);
// console.log(crit);

// function onlyUnique(arr) {
//   let a = []
//   let ans = []
//   arr.map((x)=>) 
// }

function DamageCalculator() {
  const [pokemonName, setPokemonName] = useState("");
  const [searched,setSearched] = useState(true)
  const [oppPokemonName, setOppPokemonName] = useState('')
  const [searchedOpp,setSearchedOpp] = useState(true)
  rrows = rows.slice(895)
  // console.log(rrows);
  useEffect(() => {
    console.log(rrows)
  }, []);
  return (
    <div className="h-[90%] w-full flex">
      <form className="w-1/2">
        <h1 className="m-2 font-bold underline underline-offset-2">
          Damage Calculation on Opponent Pokemon
        </h1>
        <div className="m-2">
          {/* { arr.map((obj)=>{
                return (<div className='m-2'>
                <label>{obj}: </label>
                <input type={obj==="Opponent HP" ? "number" : "text"} className='border-black border-2 ml-2' />
                <input type={(obj==="Pokemon Type") ? <input type="number" /> : ""} />
            </div>)
            })} */}
          <div className="flex">
            Pokemon Name:  
            <div className='flex flex-col'>
                <input className="border-black border-2 ml-2 w-3/4" value={pokemonName} onClick={()=>setSearched(!searched)} onChange={(e) => setPokemonName(e.target.value)}></input>
                {
                    pokemonName.length>0 && (!searched) &&
                    <div className="border-black border mt-2 ml-2 w-3/4">
                    {
                      rrows.map(row => row[2].includes(pokemonName) && <div className="cursor-pointer hover:bg-blue-400" onClick={() => { setPokemonName(row[2]); setSearched(true)}}>{row[2]}</div>)                  
                        }
                    </div>          
                }        
            </div>
          </div>
          <div>
            <label for="ptype">
              Pokemon Type:
              <select
                className="border-black border-2 m-2"
                name="type1"
                id="poke"
              >
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
              <select
                className="border-black border-2 m-2"
                name="type2"
                id="poke"
              >
                <option value="none">none</option>
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
            </label>
          </div>
          <div className="flex">
                Opponent Pokemon Name:
            <div className="flex flex-col">
                <input className="border-black border-2 ml-2 w-3/4" value={oppPokemonName} onClick={()=>setSearchedOpp(!searchedOpp)} onChange={(e) => setOppPokemonName(e.target.value)}></input>
                {
                    oppPokemonName.length>0 && (!searchedOpp) &&
                    <div className="border-black border mt-2 ml-2 w-3/4">
                        {
                        rrows.map(row => row[2].includes(oppPokemonName) && <div className="cursor-pointer hover:bg-blue-400" onClick={() => { setOppPokemonName(row[2]); setSearchedOpp(true)}}>{row[2]}</div>)                  
                        }
                    </div>          
                }        
            </div>
          </div>
            <div>
            <label for="pname">
              Opponent Pokemon Type:
              <select
                className="border-black border-2 m-2"
                name="type1"
                id="poke"
              >
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
              <select
                className="border-black border-2 m-2"
                name="type2"
                id="poke"
              >
                <option value="none">none</option>
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
            </label>
          </div>
          <div className="flex w-1/2">
            <label for="attackname">
              Attack Name:
              <input
                type="text"
                id="attackname"
                className="m-2 border-black border-2"
              />
            </label>
          </div>
          <div>
            <label for="pname">
              Opponent HP:
              <input
                type="number"
                id="pname"
                className="m-2 border-black border-2"
              ></input>
            </label>
          </div>
          <div className="m-2">
            <span>Category: </span>
            <label for="physical">
              Physical
              <input
                type="radio"
                id="physical"
                name="catg"
                className="m-2"
                onClick={ShowHideDiv1}
              />
            </label>
            <label for="special">
              Special
              <input
                type="radio"
                id="special"
                name="catg"
                className="m-2"
                onClick={ShowHideDiv1}
              />
            </label>
          </div>
          <div className="m-2" id="physicalAttack" style={{ display: "none" }}>
            <label>Attack: </label>
            <input type="number" className="m-2 border-2 border-black" />
            <label>Opponent Defense:</label>
            <input type="number" className="m-2 border-2 border-black" />
          </div>
          <div className="m-2" id="specialAttack" style={{ display: "none" }}>
            <label>Special-Attack: </label>
            <input type="number" className="m-2 border-2 border-black" />
            <label>Opponent Special-Defense:</label>
            <input type="number" className="m-2 border-2 border-black" />
          </div>
        </div>
        <div className="m-2">
          <Button variant="contained" onClick={move}>
            Calculate
          </Button>
        </div>
        <div>
          <label className="m-2">
            Damage:
            <input type="number" className="m-2 border-2 border-black" />%
          </label>
        </div>
      </form>
      <div className="h-full border-black border-2"></div>
      {/* /////////////////////////////////////////////////////////////////// */}
      <form className="w-1/2">
        <h1 className="m-2 font-bold underline underline-offset-2">
          Damage Calculation on Player Pokemon
        </h1>
        <div className="m-2">
          {/* { arr.map((obj)=>{
                return (<div className='m-2'>
                <label>{obj}: </label>
                <input type={obj==="Opponent HP" ? "number" : "text"} className='border-black border-2 ml-2' />
                <input type={(obj==="Pokemon Type") ? <input type="number" /> : ""} />
            </div>)
            })} */}
          <div>
            <label for="pname">
              Pokemon Name:
              <input
                type="text"
                id="pname"
                className="m-2 border-black border-2"
              ></input>
            </label>
          </div>
          <div>
            <label for="ptype">
              Pokemon Type:
              <select
                className="border-black border-2 m-2"
                name="type1"
                id="poke"
              >
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
              <select
                className="border-black border-2 m-2"
                name="type2"
                id="poke"
              >
                <option value="none">none</option>
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
            </label>
          </div>
          <label for="oppname">
            Opponent Pokemon Name:
            <input
              type="text"
              id="oppname"
              className="m-2 border-black border-2"
            ></input>
          </label>
          <div>
            <label for="pname">
              Opponent Pokemon Type:
              <select
                className="border-black border-2 m-2"
                name="type1"
                id="poke"
              >
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
              <select
                className="border-black border-2 m-2"
                name="type2"
                id="poke"
              >
                <option value="none">none</option>
                <option value="normal">normal</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="ice">ice</option>
                <option value="fighting">fighting</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="flying">flying</option>
                <option value="psychic">psychic</option>
                <option value="bug">bug</option>
                <option value="rock">rock</option>
                <option value="ghost">ghost</option>
                <option value="dark">dark</option>
                <option value="dragon">dragon</option>
                <option value="steel">steel</option>
                <option value="fairy">fairy</option>
              </select>
            </label>
          </div>
          <div className="flex w-1/2">
            <label for="attackname">
              Opponent Attack Name:
              <input
                type="text"
                id="attackname"
                className="m-2 border-black border-2"
              />
            </label>
          </div>
          <div>
            <label for="pname">
              HP:
              <input
                type="number"
                id="pname"
                className="m-2 border-black border-2"
              ></input>
            </label>
          </div>
          <div className="m-2">
            <span>Category: </span>
            <label for="physical2">
              Physical
              <input
                type="radio"
                id="physical2"
                name="opp-catg"
                className="m-2"
                onClick={ShowHideDiv2}
              />
            </label>
            <label for="special2">
              Special
              <input
                type="radio"
                id="special2"
                name="opp-catg"
                className="m-2"
                onClick={ShowHideDiv2}
              />
            </label>
          </div>
          <div className="m-2" id="physicalDefense" style={{ display: "none" }}>
            <label>Defense: </label>
            <input type="number" className="m-2 border-2 border-black" />
            <label>Opponent Attack:</label>
            <input type="number" className="m-2 border-2 border-black" />
          </div>
          <div className="m-2" id="specialDefense" style={{ display: "none" }}>
            <label>Special-Defense: </label>
            <input type="number" className="m-2 border-2 border-black" />
            <label>Opponent Special-Attack:</label>
            <input type="number" className="m-2 border-2 border-black" />
          </div>
        </div>
        <div className="m-2">
          <Button variant="contained" onClick={move}>
            Calculate
          </Button>
        </div>
        <div>
          <label className="m-2">
            Damage:
            <input type="number" className="m-2 border-2 border-black" />%
          </label>
        </div>
      </form>
    </div>
  );
}

export default DamageCalculator;

// let power = 100;
// let attk = 112;
// let SpAttk = 100;
// let def = 90;
// let SpDef = 100;
// let arr=[1, 1.5];
// let crit = arr[Math.floor(arr.length*Math.random())];
// let stab = 1.5;
// let type = 1;
// let hp = 105;
// let category="Physical";

// let formula1 = ((0.25 * power * (attk / def) * crit) * stab * type) * hp / 100;
// let formula2 = ((0.25 * power * (SpAttk / SpDef) * crit) * stab * type) * hp / 100;
// const move=(category==="Physical") ? formula1 : formula2;
// // console.log(move);
// console.log(crit);