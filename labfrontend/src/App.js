import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css';
import MainPage from './pages/MainPage';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Rooms from './pages/Rooms';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< MainPage />} />
        <Route path="/rooms" element={< Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};


export default App;
