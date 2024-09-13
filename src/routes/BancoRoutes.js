import React from "react";
import { Routes, Route } from 'react-router-dom';
import Bemvindo from '../pages/BemVindo.js';
import Home from '../pages/Home.js';
import Historico from '../pages/Historico.js';

const BancoRoutes = () => {
  return (    
      <Routes>
        <Route path="/" element={<Bemvindo />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/lista" element={<Historico />} /> 
      </Routes>
  );
}

export default BancoRoutes;