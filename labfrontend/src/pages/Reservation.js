import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Reservation = () => {
  const { roomName } = useParams(); // Room name from URL
  const location = useLocation();
  const room = location.state?.room; // Get room details from state

  if (!room) {
    return <div className="text-center mt-5">Room details not found!</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">{room.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            src={room.imageUrl}
            alt={room.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <p>{room.description}</p>
          <h4 className="text-primary">{room.price}</h4>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Reservation Date</label>
              <input type="date" className="form-control" id="date" required />
            </div>
            <button type="submit" className="btn btn-primary">Reserve Now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
