import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Current Time Component
const CurrentTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div
      className="d-inline-block p-5"
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#f8f9fa',
        minHeight: '150px', // Ensures enough space vertically
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h5 className="mb-1" style={{ fontWeight: '500', fontSize: '1.2rem' }}>Current Time</h5>
        <p className="lead" style={{ fontSize: '3rem', marginBottom: '0' }}>{time}</p> {/* Increased font size */}
        <p className="mt-3" style={{ fontStyle: 'italic', fontSize: '1rem', color: '#555' }}>
          "There is never a wrong time for a new event ,one book away!." 
        </p>
      </div>
    </div>
  );
};

//export default CurrentTime;

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

  const saveBooking = () => {
    if (!newBooking.name || !newBooking.event || !newBooking.date) {
      setErrorMessage('Please fill in all the fields!');
      return;
    }
    setErrorMessage('');

    // If editing an existing booking, update it
    if (editingBooking) {
      setBookings(
        bookings.map((booking) =>
          booking.id === editingBooking.id ? { ...editingBooking, ...newBooking } : booking
        )
      );
      setEditingBooking(null); // Reset the editing state
    } else {
      // If not editing, create a new booking
      setBookings([...bookings, { id: Date.now(), ...newBooking }]);
    }
    setNewBooking({ name: '', event: '', date: '' }); // Reset the form
    setModalVisible(false); // Close the modal
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const editBooking = (booking) => {
    setEditingBooking(booking);
    setNewBooking({ name: booking.name, event: booking.event, date: booking.date });
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
                <a className="nav-link" href="#events">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bookings">Bookings</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Event Banner Section */}
      <div
        className="container text-center my-4"
        style={{
          backgroundImage: 'url(/images/recep.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '600px',
          marginTop: '400px',
          width: '120%',
        }}
      >
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

      {/* Current Time */}
      <div className="container text-center my-5">
        <div className="d-flex justify-content-center gap-4">
          <CurrentTime />
        </div>
      </div>

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
