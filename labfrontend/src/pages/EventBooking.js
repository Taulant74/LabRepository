import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: '', event: '', date: '' });
  const [editingBooking, setEditingBooking] = useState(null);

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
    if (editingBooking) {
      setBookings(
        bookings.map((booking) =>
          booking.id === editingBooking.id ? { ...editingBooking, ...newBooking } : booking
        )
      );
      setEditingBooking(null);
    } else {
      setBookings([...bookings, { id: Date.now(), ...newBooking }]);
    }
    setNewBooking({ name: '', event: '', date: '' });
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const editBooking = (booking) => {
    setEditingBooking(booking);
    setNewBooking({ name: booking.name, event: booking.event, date: booking.date });
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

     {/* New Image Before Cards */}
<div 
  className="container text-center my-4" 
  style={{
    backgroundImage: 'url(/images/recep.webp)',  // Replace with your image path
    backgroundSize: 'cover',  // Ensures the image covers the entire container
    backgroundPosition: 'center',  // Keeps the image centered
    height: '600px',  // Adjust the height as needed
    marginTop: '400px',  // Pushes the image lower, adjust this as needed
    width: '120%',  // Ensures the image takes up the full width of the screen
  }}
>
  {/* Optional content over the image */}
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
    <h2 className="text-white">Events of Dardania Heights</h2>
  </div>
</div>


{/* Text Below the Image but Above Events */}
<div className="container text-center my-5">
  <h3 className="text-primary mb-3">Why Choose Our Events?</h3>
  <p className="lead">
    At Dardania Heights, we believe that every moment is an opportunity to create lasting memories. Our carefully curated events offer something for everyone—whether you're seeking relaxation, excitement, or a bit of both. From indulgent wine tastings and soothing yoga sessions to lively karaoke nights and fun-filled pool parties, our events provide the perfect atmosphere to unwind and connect with others. 
  </p>
  <p>
    Choose Dardania Heights for your next celebration and let us take care of the details while you enjoy the moment. With expert guidance, top-tier amenities, and unforgettable experiences, we guarantee that you’ll leave with more than just great memories—you’ll leave with a smile!
  </p>
</div>




      {/* Events Section */}
      <div className="row" id="events">
        {predefinedEvents.map((event, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              {event.image && (
                <img
                  src={event.image}
                  alt={event.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <div className="container py-5">
        <h2 className="text-center mb-4">{editingBooking ? 'Edit Booking' : 'Book an Event'}</h2>
        <div className="row">
          <div className="col-md-4 mb-3">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={newBooking.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4 mb-3">
            <select
              name="event"
              value={newBooking.event}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select Event</option>
              {predefinedEvents.map((event, index) => (
                <option key={index} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="date"
              name="date"
              value={newBooking.date}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-12">
            <button onClick={saveBooking} className="btn btn-outline-primary w-100">
              {editingBooking ? 'Update Booking' : 'Book'}
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="container py-5" id="bookings">
        <h2 className="text-center mb-4">All Bookings</h2>
        {bookings.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Event</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.event}</td>
                  <td>{booking.date}</td>
                  <td>
                    <button
                      onClick={() => editBooking(booking)}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No bookings yet. Be the first to book an event!</p>
        )}
      </div>

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
