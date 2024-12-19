import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Review from './pages/Review';
import EventBooking from './pages/EventBooking';

const App = () => {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={< Review />} />
        <Route path="/eventbooking" element={<EventBooking />} />
      </Routes>
    </Router>
  );
};

export default App;
