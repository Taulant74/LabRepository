import React, { useState, useEffect } from "react";

const EventBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    name: "",
    eventName: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new booking (you can replace this with an API call)
    setBookings([...bookings, newBooking]);
    setNewBooking({ name: "", eventName: "", date: "" });
  };

  useEffect(() => {
    // Fetch initial bookings (dummy data here; replace with an API call)
    setBookings([
      { name: "Alice Johnson", eventName: "Conference", date: "2024-12-15" },
      { name: "Bob Smith", eventName: "Wedding", date: "2024-12-20" },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Event Booking</h1>

      {/* Booking Form */}
      <div className="card mb-4">
        <div className="card-header text-white bg-primary">
          <h4 className="mb-0">Book an Event</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your Name"
                  value={newBooking.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  name="eventName"
                  placeholder="Event Name"
                  value={newBooking.eventName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={newBooking.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-1">
                <button type="submit" className="btn btn-primary w-100">
                  Book
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Booking List */}
      <h2 className="mb-3">All Bookings</h2>
      <ul className="list-group">
        {bookings.map((booking, index) => (
          <li key={index} className="list-group-item">
            <strong>{booking.name}</strong> booked{" "}
            <em>{booking.eventName}</em> on <span>{booking.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventBooking;
