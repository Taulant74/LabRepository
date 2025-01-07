import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css';
import MainPage from './pages/MainPage';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Rooms from './pages/Rooms';
<<<<<<< HEAD
import EventBooking from './pages/EventBooking';

=======
import Feedback from './pages/Feedback';
>>>>>>> b05ce56c37ca8f5690a74871f5a05bff29053101

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Feedback/>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/eventbooking" element={<EventBooking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
};


export default App;
