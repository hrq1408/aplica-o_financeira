import React from "react";
import { Routes, Route } from 'react-router-dom';
import Bemvindo from '../pages/BemVindo.js';
import Home from '../pages/Home.js';
import Historico from '../pages/Historico.js';
import RouteSecuret from '../auth/RouteSecuret.js';

const BancoRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Bemvindo />} />
      <Route element={<RouteSecuret />}>
        <Route path="/home" element={<Home />} />
        <Route path="/lista/:userId" element={<Historico />} />
      </Route>
    </Routes>
  );
}

export default BancoRoutes;