import './App.css';
import React from 'react';
import { useState} from "react";
import {BrowserRouter as Router,Switch,Route,BrowserRouter, Routes} from 'react-router-dom';
import Teambuilder from './Teambuilder';
import Navbar from './Navbar';
import Home from './Home';
import Data from './Data';
import Battle from './Battle';
import DamageCalculator from './DamageCalculator';
import Signin from './Signin';
import SignUp from './SignUp';
import MyTeam from './MyTeam';
import Sidebar from './components/Sidebar';

function App() {
  // console.log(localStorage.getItem("name").username)
  // console.log(localStorage)
  const obj = JSON.parse(localStorage.getItem('userinfo'));
  // console.log("obj", obj);
  const [userinfo, setUserinfo] = useState(() => obj)
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App h-full flex flex-col bg-cover bg-no-repeat bg-[url('https://media.giphy.com/media/cNlhpWYx5PGsOGXAil/giphy.gif')]  ">
      <Router> 
        <div className=''>
          <Navbar userinfo={userinfo} setUserinfo={setUserinfo} setToggle={setToggle} />
          <Sidebar toggle={toggle} />
        </div>
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/teambuilder' exact element={<Teambuilder/>}/>
            <Route path='/battle' exact element={<Battle userinfo={userinfo}/>} />
            <Route path='/damagecalculator' exact element={<DamageCalculator />} />
            <Route path='/signin' exact element={<Signin setUserinfo={setUserinfo} />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/myteams' exact element={<MyTeam userinfo={userinfo} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
