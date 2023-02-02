import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PokemonSlots from './PokemonSlots'
import Button from '@mui/material/Button';
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";


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

let myTeam=undefined;

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
  }, [])

  useEffect(() => {
    if (selectedTeam != undefined) {
      myTeam = teams[selectedTeam]
      localStorage.removeItem("myTeam");
      localStorage.setItem("myteam", JSON.stringify(myTeam));
    }
  }, [selectedTeam])
  
  const handleDelete = () => {
    
  }

  return (
    <div className='h-full w-full flex flex-col items-center '>
        <div className='m-2 h-auto flex justify-center'>{
          selectedTeam === undefined ? <h3>Please build and select a team</h3> : 
          <PokemonSlots team={teams[selectedTeam]} colors={"bg-green-400"} />
        }</div>
        {selectedTeam != undefined &&
          <Link to="/battle">
              <Button variant="contained" theme={theme} >
                Battle
              </Button>
          </Link>}
          Your Teams
        {
          teams && teams.length > 0 &&
          teams.map((team, index) => {
            return <div className='h-auto m-4 flex '>
              {teams.length>0 && <PokemonSlots team={teams[index]} colors={"bg-purple-400"} />}
              <div className='h-full justify-center mx-4 w-1/2 '>
                <div className='w-full h-full flex items-center'>
                  {
                    <div className='mx-4'>{selectedTeam == index ? <Button variant='contained' theme={theme} color="primary" onClick={() => setSelectedTeam(index)}>Selected</Button> : <Button variant='contained' theme={theme} color="secondary" onClick={() => setSelectedTeam(index)}>Select</Button>}</div>
                  }
                  <div className='mx-4'><Button variant='contained'>Edit</Button></div>
                  <div className='mx-4'><Button variant='contained' onClick={handleDelete}>Delete</Button></div>
                </div>
              </div>
            </div>
          })
        }
    </div>
  )
}

export default MyTeam
export {myTeam}