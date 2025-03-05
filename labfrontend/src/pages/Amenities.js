import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">Dardania Heights</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#rooms">Rooms</a></li>
              <li className="nav-item"><a className="nav-link" href="#amenities">Amenities</a></li>
              <li className="nav-item"><a className="nav-link" href="#offers">Special Offers</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="carousel slide" id="coverCarousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/resort1.jpg" className="d-block w-100" alt="Cover" />
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2 id="amenities">Amenities</h2>
        <p>At Dardania Heights, we offer top-notch amenities to make your stay unforgettable.</p>
      </div>

      <div className="container my-5">
        <div className="row">
          {amenities.map((amenity, index) => (
            <div key={index} className="col-md-6 mb-4 text-center">
              <div className="amenity-wrapper">
                <img 
                  src={amenity.imageUrl} 
                  alt={amenity.name} 
                  className="img-fluid rounded shadow amenity-img" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedAmenity(amenity)}
                />
                <div className="hover-text">{amenity.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAmenity && (
        <div className="modal show d-block fade-in" tabIndex="-1" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content slide-in">
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

      <footer className="bg-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
        </div>
      </footer>

      <style>
        {`
          .amenity-img {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .amenity-img:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          }

          .amenity-wrapper {
            position: relative;
            display: inline-block;
          }

          .hover-text {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .amenity-wrapper:hover .hover-text {
            opacity: 1;
          }

          .fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }

          .slide-in {
            animation: slideIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Amenities;
