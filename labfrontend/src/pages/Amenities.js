import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCar, faUtensils, faCouch } from '@fortawesome/free-solid-svg-icons';

const Amenities = () => {
  const amenities = [
    {
      name: 'Gym',
      description: 'State-of-the-art fitness center with modern equipment.',
      imageUrl: '/images/gym.jpg',
    },
    {
      name: 'Spa',
      description: 'Relax and rejuvenate with our premium spa services.',
      imageUrl: '/images/spa.jpg',
    },
    {
      name: 'Sauna',
      description: 'Experience the ultimate relaxation in our sauna.',
      imageUrl: '/images/sauna.jpg',
    },
    {
      name: 'Swimming Pool',
      description: 'Enjoy a refreshing swim in our luxurious pool.',
      imageUrl: '/images/spool.jpeg',
    },
  ];

  return (
    <div>
      <style>
        {`
          .amenities-section {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .amenity {
            display: flex;
            align-items: center;
            gap: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .amenity:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }

          .amenity:nth-child(odd) {
            flex-direction: row;
          }

          .amenity:nth-child(even) {
            flex-direction: row-reverse;
          }

          .amenity img {
            width: 45%;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
          }

          .amenity-details {
            width: 50%;
          }

          .amenity-title {
            font-size: 1.5rem;
            font-weight: 600;
          }

          .book-button {
            margin-top: 10px;
          }

          .highlight-section {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }

          .highlight {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            max-width: 250px;
            flex: 1;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .highlight-icon {
            font-size: 2rem;
            color: #007bff;
            margin-bottom: 10px;
          }

          .highlight-title {
            font-size: 1.2rem;
            font-weight: bold;
          }

          .highlight-text {
            font-size: 0.9rem;
            color: #6c757d;
          }

          .carousel-inner img {
            height: 450px;
            object-fit: cover;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">Dardania Heights</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#rooms">Rooms</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#amenities">Amenities</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#offers">Special Offers</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/resort1.jpg" className="d-block w-100" alt="Cover Slide" />
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2 id="amenities">Amenities</h2>
        <p>At Dardania Heights, we offer top-notch amenities to make your stay unforgettable.</p>
      </div>

      <div className="container my-5 amenities-section">
        {amenities.map((amenity, index) => (
          <div key={index} className="amenity">
            <img src={amenity.imageUrl} alt={amenity.name} />
            <div className="amenity-details">
              <h5 className="amenity-title">{amenity.name}</h5>
              <p>{amenity.description}</p>
              <button className="btn btn-outline-primary book-button">Book Now</button>
            </div>
          </div>
        ))}
      </div>

      <div className="container my-5">
        <div className="text-center">
          <h3>Additional Amenities</h3>
        </div>
        <div className="highlight-section">
          <div className="highlight">
            <FontAwesomeIcon icon={faClock} className="highlight-icon" />
            <h5 className="highlight-title">Reception 24/7</h5>
            <p className="highlight-text">Our friendly staff is at your service 24 hours a day at the reception.</p>
          </div>
          <div className="highlight">
            <FontAwesomeIcon icon={faCar} className="highlight-icon" />
            <h5 className="highlight-title">Parking</h5>
            <p className="highlight-text">Underground parking available for our clients, for free, 24 hours a day.</p>
          </div>
          <div className="highlight">
            <FontAwesomeIcon icon={faUtensils} className="highlight-icon" />
            <h5 className="highlight-title">Restaurant</h5>
            <p className="highlight-text">The restaurant, where guests can have their breakfast, is located on the ground floor.</p>
          </div>
          <div className="highlight">
            <FontAwesomeIcon icon={faCouch} className="highlight-icon" />
            <h5 className="highlight-title">Lobby</h5>
            <p className="highlight-text">Derand Hotel features a modern lobby to warmly welcome its guests with comfortable seating.</p>
          </div>
        </div>
      </div>

      <footer className="bg-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Amenities;
