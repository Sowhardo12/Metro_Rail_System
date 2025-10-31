import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import MetroLocation from './pages/MetroLocation';
import './styles.css';

function Protected({children}){
  const token = localStorage.getItem('token');
  return token?children:<Navigate to="/login"/>;
}
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
        <Route path="/recharge" element={<Protected><Recharge/></Protected>} />
        <Route path="/metro-location" element={<Protected><MetroLocation/></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}