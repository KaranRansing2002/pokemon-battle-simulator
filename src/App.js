import './App.css';
import React from 'react';
import {BrowserRouter as Router,Switch,Route,BrowserRouter, Routes} from 'react-router-dom';
import Teambuilder from './Teambuilder';
import Navbar from './Navbar';
import Home from './Home';
import Data from './Data';

function App() {
  return (
    <div className="App h-full">
      <Router>
        <Navbar />
        <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/teambuilder' exact element={<Teambuilder/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
