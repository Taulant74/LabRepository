import React, { useState } from 'react';

const EventBooking = () => {
  const [bookings, setBookings] = useState([
    { id: 1, name: 'Alice Johnson', event: 'Conference', date: '2024-12-15' },
    { id: 2, name: 'Bob Smith', event: 'Wedding', date: '2024-12-20' },
  ]);

  const [newBooking, setNewBooking] = useState({ name: '', event: '', date: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const addBooking = () => {
    if (newBooking.name && newBooking.event && newBooking.date) {
      setBookings([...bookings, { id: bookings.length + 1, ...newBooking }]);
      setNewBooking({ name: '', event: '', date: '' });
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Event Booking</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Book an Event</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={newBooking.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          name="event"
          placeholder="Event Name"
          value={newBooking.event}
          onChange={handleInputChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="date"
          name="date"
          placeholder="Event Date"
          value={newBooking.date}
          onChange={handleInputChange}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={addBooking} style={{ padding: '5px 10px', cursor: 'pointer' }}>Book</button>
      </div>

      <div>
        <h2>All Bookings</h2>
        {bookings.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bookings.map((booking) => (
              <li key={booking.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <strong>{booking.name}</strong> booked <strong>{booking.event}</strong> on <strong>{booking.date}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet. Be the first to book an event!</p>
        )}
      </div>
    </div>
  );
};

export default EventBooking;
