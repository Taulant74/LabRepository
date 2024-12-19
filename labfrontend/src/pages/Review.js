import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    reviewID: "", // Include reviewID for manual input
    hotelID: "",
    guestID: "",
    rating: "",
    comment: "",
    reviewDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // API Base URL
  const apiUrl = "https://localhost:7085/api/Review"; // Adjust this as per your backend API URL

  // Fetch Reviews from the API
  const fetchReviews = async () => {
    try {
      const response = await axios.get(apiUrl);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Fetch reviews when component mounts
  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Add/Update Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
     
      try {
        await axios.put(`${apiUrl}/${formData.reviewID}`, formData);
        fetchReviews();
        setShowModal(false);
      } catch (error) {
        console.error("Error updating review:", error);
      }
    } else {
     
      try {
        await axios.post(apiUrl, formData);
        fetchReviews();
        setShowModal(false);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

 
  const handleEdit = (review) => {
    setIsEditing(true);
    setFormData(review); 
    setShowModal(true);
  };

 
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  
  const handleAdd = () => {
    setIsEditing(false); 
    setFormData({
      reviewID: "", 
      hotelID: "",
      guestID: "",
      rating: "",
      comment: "",
      reviewDate: "",
    });
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Reviews</h1>
      <Button variant="primary" onClick={handleAdd} className="mb-3">
        Add Review
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel ID</th>
            <th>Guest ID</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Review Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.reviewID}>
              <td>{review.reviewID}</td>
              <td>{review.hotelID || "N/A"}</td>
              <td>{review.guestID || "N/A"}</td>
              <td>{review.rating || "N/A"}</td>
              <td>{review.comment || "N/A"}</td>
              <td>
                {review.reviewDate
                  ? new Date(review.reviewDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(review)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(review.reviewID)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Review" : "Add Review"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
  {}
  {!isEditing && (
    <Form.Group className="mb-3">
      <Form.Label>Review ID</Form.Label>
      <Form.Control
        type="number"
        name="reviewID"
        value={formData.reviewID}
        onChange={handleChange}
        required
      />
    </Form.Group>
  )}
  
  {/* Hotel ID Field */}
  <Form.Group className="mb-3">
    <Form.Label>Hotel ID</Form.Label>
    <Form.Control
      type="number"
      name="hotelID"
      value={formData.hotelID}
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* Guest ID Field */}
  <Form.Group className="mb-3">
    <Form.Label>Guest ID</Form.Label>
    <Form.Control
      type="number"
      name="guestID"
      value={formData.guestID}
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* Rating Field */}
  <Form.Group className="mb-3">
    <Form.Label>Rating</Form.Label>
    <Form.Control
      type="number"
      name="rating"
      value={formData.rating}
      onChange={handleChange}
      required
    />
  </Form.Group>

  {/* Comment Field */}
  <Form.Group className="mb-3">
    <Form.Label>Comment</Form.Label>
    <Form.Control
      type="text"
      name="comment"
      value={formData.comment}
      onChange={handleChange}
    />
  </Form.Group>

  {/* Review Date Field */}
  <Form.Group className="mb-3">
    <Form.Label>Review Date</Form.Label>
    <Form.Control
      type="date"
      name="reviewDate"
      value={formData.reviewDate}
      onChange={handleChange}
      required
    />
  </Form.Group>

  <Button variant="primary" type="submit">
    {isEditing ? "Update Review" : "Add Review"}
  </Button>
</Form>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewsPage;
