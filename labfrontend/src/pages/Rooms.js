import React, { useState } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Rooms = () => {
  const rooms = [
    { name: 'Deluxe Room', description: 'Luxurious room with modern amenities and city views.', price: '$120/night', imageUrl: '/images/room1.jpg' },
    { name: 'Suite Room', description: 'Spacious suite with a king-size bed and premium services.', price: '$200/night', imageUrl: '/images/room2.jpg' },
    { name: 'Standard Room', description: 'Comfortable room with all essential amenities.', price: '$90/night', imageUrl: '/images/room3.jpg' },
  ];

  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAdults, setSelectedAdults] = useState(1);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">Dardania Heights</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/rooms">Rooms</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/amenities">Amenities</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/feedback">Feedback</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/event">Events</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="coverCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/DardaniaHeights.png" className="d-block w-100" alt="Cover" />
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <h2 className="fw-bold">Explore Our Rooms</h2>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center p-4 bg-light rounded shadow-sm">
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
              <option value="">Select Room</option>
              {rooms.map((room, index) => (
                <option key={index} value={room.name}>{room.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input type="date" className="form-control" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />
          </div>
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setSelectedAdults(e.target.value)} value={selectedAdults}>
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100">Book Now</button>
          </div>
        </div>

        <div className="row mt-5">
          {rooms.map((room, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card shadow-lg border-0">
                <img src={room.imageUrl} alt={room.name} className="card-img-top img-fluid rounded" />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{room.name}</h5>
                  <p>{room.description}</p>
                  <p className="fw-bold text-primary">{room.price}</p>
                  <Link to="/reservation" className="btn btn-outline-primary">Book Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-light py-4 text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Rooms;
