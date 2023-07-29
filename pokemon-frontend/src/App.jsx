import { createContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Home from './pages/home/Home'
import TeamBuilder from './pages/teambuilder/TeamBuilder'
import Signin from './pages/Auth/Signin'
import Signup from './pages/Auth/Signup'
import axios from 'axios'
import api from './helper/api'
import MyTeams from './pages/myteams/MyTeams'
import Battle from './pages/battle/Battle'
import BattleMatchMaking from './pages/battle/BattleMatchMaking';

export const userContext = createContext();

function App() {

  const [userinfo, setUserinfo] = useState()
  const [battleTeam, setBattleTeam] = useState();

  useEffect(() => {
    const check = async () => {
      const resp = await axios.get(`${api}/user/login`, {
        withCredentials: true
      });
      if (resp.data.message) {
        setUserinfo(undefined);
      }
      else {
        setUserinfo(resp.data);
      }
      // console.log(resp.data)
    }
    check();
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <userContext.Provider value={{ userinfo, setUserinfo, battleTeam, setBattleTeam }}>
        <Router>
          <Navbar />
          <div className='flex-grow'>
            <Routes>
              <Route path='/' exact element={<Home />}></Route>
              <Route path='/teambuilder' exact element={<TeamBuilder />}></Route>
              <Route path='/signin' exact element={<Signin />}></Route>
              <Route path='/signup' exact element={<Signup />}></Route>
              <Route path='/myteams' exact element={<MyTeams />}></Route>
              <Route path='/battle' exact element={<BattleMatchMaking />}></Route>
            </Routes>
          </div>
        </Router>
      </userContext.Provider>
    </div>
  )
}

export default App
