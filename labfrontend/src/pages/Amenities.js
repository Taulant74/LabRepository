import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Amenities = () => {
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const amenities = [
    { name: 'Gym', description: 'State-of-the-art fitness center with modern equipment.', imageUrl: '/images/gym.jpg' },
    { name: 'Spa', description: 'Relax and rejuvenate with our premium spa services.', imageUrl: '/images/spa.jpg' },
    { name: 'Sauna', description: 'Experience the ultimate relaxation in our sauna.', imageUrl: '/images/sauna.jpg' },
    { name: 'Swimming Pool', description: 'Enjoy a refreshing swim in our luxurious pool.', imageUrl: '/images/spool.jpeg' },
  ];

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
            <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/">Home</Link></li>
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
            <img src="/images/resort1.jpg" className="d-block w-100" alt="Cover" />
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2 className="fw-bold">Amenities</h2>
        <p className="text-muted">At Dardania Heights, we offer top-notch amenities to make your stay unforgettable.</p>
      </div>

      <div className="container my-5">
        <div className="row">
          {amenities.map((amenity, index) => (
            <div key={index} className="col-md-6 mb-4 text-center">
              <div className="card shadow-lg border-0">
                <img 
                  src={amenity.imageUrl} 
                  alt={amenity.name} 
                  className="card-img-top img-fluid rounded" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setSelectedAmenity(amenity)}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{amenity.name}</h5>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setSelectedAmenity(amenity)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAmenity && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedAmenity.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedAmenity(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={selectedAmenity.imageUrl} alt={selectedAmenity.name} className="img-fluid rounded" />
                <p className="mt-3">{selectedAmenity.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-light py-4 text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Amenities;
