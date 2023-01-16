import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PokemonSlots from './PokemonSlots'
import Button from '@mui/material/Button';
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    primary: {
      light: "#26a69a",
      main: "#009688",
      dark: "#00897b",
      contrastText: "#fff",
    },
    secondary: {
      light: "#1975c2",
      main: "#1975c2",
      dark: "#1975c2",
      contrastText: "#fff",
    },
  },
});



function MyTeam({ userinfo }) {
  const [selectedTeam, setSelectedTeam] = useState(undefined)
  const [teams, setTeams] = useState([]) 

  useEffect(() => {
    axios.get('http://localhost:8000/user/team', {
      withCredentials : true
    }).then((resp) => {
      setTeams(resp.data.data);
      teams.map(team => {
        let arr = Object.keys(team);
        arr=arr.slice(0,arr.length-1)
        arr.map(obj=>console.log(team[obj]))
      })
    })
  },[])

  return (
    <div className='h-full w-full flex flex-col items-center '>
        <div className='m-2 h-auto flex justify-center'>{
          selectedTeam === undefined ? <h3>Please build and select a team</h3> : 
          <PokemonSlots team={teams[selectedTeam]} colors={"bg-green-400"} />
        }</div>
          Your Teams
        {
          teams && teams.length > 0 &&
          teams.map((team, index) => {
            return <div className='h-auto m-4  flex '>
              {teams.length>0 && <PokemonSlots team={teams[index]} colors={"bg-purple-400"} />}
              <div className='h-full flex items-center mx-4'>
                {
                  selectedTeam == index ? <Button variant='contained' theme={theme} color="primary" onClick={() => setSelectedTeam(index)}>Selected</Button> : <Button variant='contained' theme={theme} color="secondary" onClick={() => setSelectedTeam(index)}>Select</Button>
                }
              </div>
            </div>
          })
        }
    </div>
  )
}

export default MyTeam
