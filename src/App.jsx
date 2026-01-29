import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CropRecommendation from './pages/CropRecommendation';
import MarketPrices from './pages/MarketPrices';
import GovSchemes from './pages/GovSchemes';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isAuthenticated = true; // TODO: Implement Auth

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard />} />
          <Route path="recommendations" element={<CropRecommendation />} />
          <Route path="market" element={<MarketPrices />} />
          <Route path="schemes" element={<GovSchemes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
