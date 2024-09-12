import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';



const BancoRoutes = () => {
  return (    
      <Routes>
        <Route path="/" element={<Home />} /> 
      </Routes>      
  );
}

export default BancoRoutes;