import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import './App.css';
import EventBooking from './pages/EventBooking';

import MainPage from './pages/MainPage';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Rooms from './pages/Rooms';
import Feedback from './pages/Feedback';
import Review from './pages/Review';
import Profile from './pages/Profile';
import Amenities from './pages/Amenities';
import AboutUs from './pages/AboutUs';
import Reservation from './pages/Reservation';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< MainPage/>} />
        <Route path="/rooms" element={< Rooms/>} />
        <Route path="/amenities" element={< Amenities/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/review" element={<Review />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/event" element={<EventBooking />} /> 
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/reservation" element={<Reservation />} />

      </Routes>
    </Router>
  );
};


export default App;
