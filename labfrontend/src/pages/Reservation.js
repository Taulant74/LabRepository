import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Reservation = () => {
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: "Standard", price: 90, imageUrl: "/images/standard.png" },
    { id: 2, name: "Deluxe", price: 120, imageUrl: "/images/deluxe.png" },
    { id: 3, name: "Suite", price: 200, imageUrl: "/images/suite.png" },
  ]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Fetch rooms from the backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://localhost:7085/api/Room");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Handle room type selection
  const handleRoomTypeClick = (roomType) => {
    setSelectedRoomType(roomType);
  };

  // Handle reservation
  const handleReserveNow = async (roomId) => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const reservationData = {
      guestID: 1, // Replace with dynamic guest ID
      hotelID: 1, // Replace with the appropriate hotel ID
      roomID: roomId,
      checkInDate,
      checkOutDate,
      totalPrice: selectedRoomType.price, // Calculate based on room price
    };

    try {
      await axios.post("https://localhost:7085/api/Reservation", reservationData);
      alert("Reservation successful!");
    } catch (error) {
      console.error("Error making reservation:", error);
      alert("Failed to make reservation.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Make a Reservation</h1>

      {/* Room Type Boxes */}
      {!selectedRoomType && (
        <div className="row text-center mt-5">
          {roomTypes.map((roomType) => (
            <div key={roomType.id} className="col-md-4 mb-4">
              <div
                className="card"
                onClick={() => handleRoomTypeClick(roomType)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={roomType.imageUrl}
                  className="card-img-top"
                  alt={roomType.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{roomType.name}</h5>
                  <p className="card-text">Price: €{roomType.price} / night</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Room Availability Table */}
      {selectedRoomType && (
        <div className="mt-5">
          <button
            className="btn btn-secondary mb-4"
            onClick={() => setSelectedRoomType(null)}
          >
            Back to Room Types
          </button>
          <h3 className="text-center mb-4">
            Available Rooms: {selectedRoomType.name}
          </h3>

          <div className="row">
            {rooms
              .filter((room) => room.roomTypeID === selectedRoomType.id)
              .map((room) => (
                <div key={room.roomID} className="col-md-4 mb-4">
                  <div className="card">
                    <div
                      className={`card-body ${
                        room.occupiedByGuestID ? "bg-danger text-white" : "bg-success text-white"
                      }`}
                    >
                      <h5 className="card-title">Room {room.roomNumber}</h5>
                      <p className="card-text">
                        Status: {room.occupiedByGuestID ? "Unavailable" : "Available"}
                      </p>
                      {!room.occupiedByGuestID && (
                        <>
                          <input
                            type="date"
                            className="form-control mb-3"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                          />
                          <input
                            type="date"
                            className="form-control mb-3"
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                          />
                          <button
                            className="btn btn-primary"
                            onClick={() => handleReserveNow(room.roomID)}
                          >
                            Reserve Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
