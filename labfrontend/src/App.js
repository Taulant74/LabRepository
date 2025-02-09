import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter from here

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
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<MainPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/review" element={<Review />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/event" element={<EventBooking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
