import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Sidebar from './components/Sidebar.js';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Report from './pages/Report';
import Sales from './pages/Sales';
import User from './pages/User';
function App() {

  return (
    <>
    <BrowserRouter>
      <Sidebar/>
    <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/inventory' element={<Inventory/>}/>
          <Route path='/report' element={<Report/>}/>
          <Route path='/sales' element={<Sales/>}/>
          <Route path='/user' element={<User/>}/>
    </Routes>
    </BrowserRouter>
    </>


  );
}

export default App;
