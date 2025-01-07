import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css';
import MainPage from './pages/MainPage';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Rooms from './pages/Rooms';
import Feedback from './pages/Feedback';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Feedback/>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
};


export default App;
