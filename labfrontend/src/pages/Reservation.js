import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, Link } from "react-router-dom";

const Reservation = () => {
  const { roomId } = useParams(); // Extract room ID from URL
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const roomsData = [
      {
        id: 1,
        name: "Deluxe Room",
        description: "Luxurious room with modern amenities and city views.",
        maxOccupancy: 2,
        price: 120,
        status: "Available",
        imageUrl: "/images/room1.jpg",
      },
      {
        id: 2,
        name: "Suite Room",
        description: "Spacious suite with a king-size bed and premium services.",
        maxOccupancy: 3,
        price: 200,
        status: "Available",
        imageUrl: "/images/room2.jpg",
      },
      {
        id: 3,
        name: "Standard Room",
        description: "Comfortable room with all essential amenities.",
        maxOccupancy: 2,
        price: 90,
        status: "Available",
        imageUrl: "/images/room3.jpg",
      },
    ];

    const roomData = roomsData.find((room) => room.id.toString() === roomId); // Match roomId
    setRoomDetails(roomData);
    setLoading(false);
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!roomDetails) {
    return (
      <div className="container mt-5 text-center">
        <h2>Room not found</h2>
        <p>The room you're looking for does not exist. Please go back and select a valid room.</p>
        <Link to="/" className="btn btn-primary">Back to Rooms</Link>
      </div>
    );
  }

  const handleReservation = () => {
    alert(`Reservation for ${roomDetails.name} completed successfully!`);
  };

  return (
    <div className="container mt-5">
      <h2 className="reservation-header">{roomDetails.name}</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={roomDetails.imageUrl}
            alt={roomDetails.name}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 reservation-details">
          <p><strong>Description:</strong> {roomDetails.description}</p>
          <p><strong>Max Occupancy:</strong> {roomDetails.maxOccupancy}</p>
          <p><strong>Price:</strong> ${roomDetails.price} per night</p>
          <p><strong>Status:</strong> {roomDetails.status}</p>
          <button
            className="btn btn-primary btn-reserve"
            onClick={handleReservation}
          >
            Reserve Now
          </button>
          <Link to="/" className="btn btn-secondary btn-back">Back to Rooms</Link>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
