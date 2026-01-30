import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AIAdvisor from './pages/AIAdvisor';
import MarketPrices from './pages/MarketPrices';
import GovSchemes from './pages/GovSchemes';
import CropCalendar from './pages/CropCalendar';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
// Added this import assuming the file exists, as it is used in the Reneto routes
import CropRecommendation from './pages/CropRecommendation'; 

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        
        {/* Resolved Conflict: Using Reneto's granular routing */}
        <Route path="advisor" element={<AIAdvisor />} />
        <Route path="recommendations" element={<CropRecommendation />} />
        
        <Route path="market" element={<MarketPrices />} />
        <Route path="schemes" element={<GovSchemes />} />
        <Route path="calendar" element={<CropCalendar />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;