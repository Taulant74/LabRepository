import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// EventBooking Component
const EventBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: '', event: '', date: '' });
  const [editingBooking, setEditingBooking] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // Error message for form validation
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for booking

  const predefinedEvents = [
    { name: 'Wine Tasting', description: 'Enjoy an exclusive selection of premium wines with expert guidance.', image: '/images/wine.jpeg' },
    { name: 'Yoga Session', description: 'Relax and rejuvenate with guided yoga sessions led by professional instructors.', image: '/images/yoga.webp' },
    { name: 'Karaoke Night', description: 'Sing your heart out and enjoy a night of music and fun.', image: '/images/karaoke.jpeg' },
    { name: 'Cooking Class', description: 'Learn to cook delicious dishes with our expert chefs.', image: '/images/cooking.jpeg' },
    { name: 'Pool Party', description: 'Have fun in the sun with music, drinks, and poolside activities.', image: '/images/pool.jpeg' },
    { name: 'Movie Night', description: 'Enjoy a classic movie under the stars with popcorn and drinks.', image: '/images/movie.jpeg' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  // Save Booking with Conflict Handling
  const saveBooking = async () => {
    if (!newBooking.name || !newBooking.event || !newBooking.date) {
      setErrorMessage('Please fill in all the fields!');
      return;
    }
    setErrorMessage('');

    try {
      const response = await fetch('/api/EventBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });

      if (!response.ok) {
        if (response.status === 409) {
          const error = await response.json();
          setErrorMessage(error.message); // Display the error message
        } else {
          setErrorMessage('Failed to book the event. Please try again later.');
        }
        return;
      }

      const data = await response.json();
      setBookings([...bookings, data]);
      setNewBooking({ name: '', event: '', date: '' }); // Reset the form
      setModalVisible(false); // Close the modal
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Dardania Heights</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#rooms">Rooms</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#feedback">Feedback</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#event">Events</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Event Banner Section */}
      <div className="container text-center my-4" style={{
        backgroundImage: 'url(/images/recep.webp)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '600px', 
        marginTop: '400px',
        width: '120%',
      }}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <h2 className="text-white">Events of Dardania Heights</h2>
        </div>
      </div>

      <div className="container text-center my-5">
        <h3 className="text-primary mb-3">Why Choose Our Events?</h3>
        <p className="lead">
          At Dardania Heights, we don’t just host events – we create unforgettable experiences designed to leave you with memories that last a lifetime.
        </p>
      </div>

      {/* Events Cards */}
      <div className="row" id="events">
        {predefinedEvents.map((event, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-lg hover-shadow">
              <img src={event.image} alt={event.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <button onClick={() => openModal(event)} className="btn btn-outline-primary">Book This Event</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger text-center" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Booking Modal */}
      {modalVisible && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book {selectedEvent.name}</h5>
                <button type="button" className="close" onClick={() => setModalVisible(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={newBooking.name}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
                <input
                  type="date"
                  name="date"
                  value={newBooking.date}
                  onChange={handleInputChange}
                  className="form-control mb-3"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalVisible(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={saveBooking}>Book Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventBooking;
