import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rooms = () => {
  const rooms = [
    {
      name: 'Deluxe Room',
      description: 'Luxurious room with modern amenities and city views.',
      price: '$120/night',
      imageUrl: '/images/room1.jpg',
    },
    {
      name: 'Suite Room',
      description: 'Spacious suite with a king-size bed and premium services.',
      price: '$200/night',
      imageUrl: '/images/room2.jpg',
    },
    {
      name: 'Standard Room',
      description: 'Comfortable room with all essential amenities.',
      price: '$90/night',
      imageUrl: '/images/room3.jpg',
    },
  ];

  return (
    <div>
      <style>
        {`
          .hero {
            position: relative;
            background: url('/images/DardaniaHeights.png') top/cover no-repeat;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
          }

          .hero h1 {
            font-size: 3rem;
            font-weight: bold;
          }

          .room-section {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .room {
            display: flex;
            align-items: center;
            gap: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .room:hover {
            transform: scale(1.05);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }

          .room:nth-child(odd) {
            flex-direction: row;
          }

          .room:nth-child(even) {
            flex-direction: row-reverse;
          }

          .room img {
            width: 45%;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
          }

          .room-details {
            width: 50%;
          }

          .room-title {
            font-size: 1.5rem;
            font-weight: 600;
          }

          .room-price {
            font-size: 1.25rem;
            color: #007bff;
            font-weight: bold;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Dardania Heights</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#rooms">Rooms</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="hero">
        <h1></h1>
      </div>

      <div className="text-center mt-3">
        <h2>Explore Our Rooms</h2>
      </div>

      <div className="container my-5 room-section">
        {rooms.map((room, index) => (
          <div key={index} className="room">
            <img src={room.imageUrl} alt={room.name} />
            <div className="room-details">
              <h5 className="room-title">{room.name}</h5>
              <p>{room.description}</p>
              <p className="room-price">{room.price}</p>
              <a href="#" className="btn btn-outline-primary">Book Now</a>
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
      
        </div>
      </footer>
    </div>
  );
};

export default Rooms;
