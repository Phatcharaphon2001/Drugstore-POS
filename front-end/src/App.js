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
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

function App() {
  return (
    <>
    <BrowserRouter>
      <Stack direction="horizontal" style={{minWidth: '100vw'}}>
        <Sidebar />
        <div style={{height: '100vh', overflow: 'scroll', width: '100%'}}>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/sales' element={<Sales/>}/>
            <Route path='/user' element={<User/>}/>
          </Routes>
        </div>
      </Stack>
    </BrowserRouter>
    </>


  );
}

export default App;