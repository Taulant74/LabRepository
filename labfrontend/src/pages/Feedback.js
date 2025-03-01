import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Feedback = () => {
  // FEEDBACK STATES
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackID, setFeedbackID] = useState(1);
  const [guestID, setGuestID] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [message, setMessage] = useState("");

  // REVIEW STATES (using lowercase keys to match API)
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewID: 1,
    hotelID: "", // Now users can insert Hotel ID
    guestID: "",
    rating: "",
    comment: "",
    reviewDate: new Date().toISOString(),
  });

  // Fetch both Feedbacks and Reviews on component mount
  useEffect(() => {
    fetchFeedbacks();
    fetchReviews();
  }, []);

  // -----------------
  // Feedback Functions
  // -----------------
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Feedback");
      setFeedbacks(response.data);
      if (response.data.length > 0) {
        const maxID = Math.max(...response.data.map((f) => f.feedbackID));
        setFeedbackID(maxID + 1);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const newFeedbackData = {
      feedbackID,
      guestID: parseInt(guestID),
      feedbackType,
      message,
      feedbackDate: new Date().toISOString(),
    };

    try {
      await axios.post("https://localhost:7085/api/Feedback", newFeedbackData);
      fetchFeedbacks();
      setFeedbackID(feedbackID + 1);
      setGuestID("");
      setFeedbackType("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      await axios.delete(`https://localhost:7085/api/Feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  // -----------------
  // Review Functions
  // -----------------
  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Review");
      setReviews(response.data);
      if (response.data.length > 0) {
        const maxReviewID = Math.max(...response.data.map((r) => r.reviewID || 0));
        setNewReview((prev) => ({ ...prev, reviewID: maxReviewID + 1 }));
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    const reviewToAdd = {
      reviewID: newReview.reviewID,
      hotelID: newReview.hotelID ? parseInt(newReview.hotelID) : null,
      guestID: newReview.guestID ? parseInt(newReview.guestID) : null,
      rating: newReview.rating ? parseInt(newReview.rating) : null,
      comment: newReview.comment,
      reviewDate: new Date().toISOString(),
    };

    try {
      await axios.post("https://localhost:7085/api/Review", reviewToAdd);
      fetchReviews();
      setNewReview((prev) => ({
        ...prev,
        reviewID: prev.reviewID + 1,
        hotelID: "",
        guestID: "",
        rating: "",
        comment: "",
        reviewDate: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="mb-4 text-primary fw-bold">💬 Feedback & Reviews</h1>
        <p className="lead text-muted">
          Your feedback and reviews help us improve! 🏆
        </p>
      </div>

      {/* Feedback Form */}
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 rounded-4 border-0">
            <h4 className="text-center mb-3 text-secondary fw-bold">
              ✨ Leave Your Feedback
            </h4>
            <form onSubmit={handleFeedbackSubmit}>
              {/* Feedback ID (Read-only) */}
              <div className="mb-3">
                <label className="form-label">🔢 Feedback ID</label>
                <input
                  type="number"
                  className="form-control border-0 bg-light text-dark fw-bold"
                  value={feedbackID}
                  readOnly
                />
              </div>
              {/* Guest ID */}
              <div className="mb-3">
                <label className="form-label">👤 Guest ID</label>
                <input
                  type="number"
                  className="form-control"
                  value={guestID}
                  onChange={(e) => setGuestID(e.target.value)}
                  required
                  placeholder="Enter your Guest ID"
                />
              </div>
              {/* Feedback Type */}
              <div className="mb-3">
                <label className="form-label">📢 Feedback Type</label>
                <select
                  className="form-select"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Positive">😊 Positive</option>
                  <option value="Negative">😞 Negative</option>
                  <option value="Neutral">😐 Neutral</option>
                </select>
              </div>
              {/* Message */}
              <div className="mb-3">
                <label className="form-label">📝 Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Write your feedback here..."
                />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-success w-100 rounded-pill py-2"
              >
                🚀 Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="mt-5">
        <h3 className="mb-3 text-secondary fw-bold">📜 Feedback History</h3>
        {feedbacks.length === 0 ? (
          <p className="text-muted text-center">No feedbacks available.</p>
        ) : (
          <div className="row">
            {feedbacks.map((feedback, index) => (
              <div key={feedback.feedbackID || index} className="col-md-6">
                <div className="card shadow-sm mb-4 rounded-4 border-0 p-3">
                  <h5 className="fw-bold">
                    Feedback #{feedback.feedbackID}{" "}
                    <span
                      className={`badge ${
                        feedback.feedbackType === "Positive"
                          ? "bg-success"
                          : feedback.feedbackType === "Negative"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      } ms-2`}
                    >
                      {feedback.feedbackType}
                    </span>
                  </h5>
                  <p className="mb-1">
                    <strong>👤 Guest ID:</strong> {feedback.guestID}
                  </p>
                  <p className="mb-1">
                    <strong>📩 Message:</strong> {feedback.message}
                  </p>
                  <p className="text-muted">
                    <strong>📅 Date:</strong>{" "}
                    {new Date(feedback.feedbackDate).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Section */}
      <div className="mt-5">
        <h1 className="text-center mb-4 text-primary fw-bold">📝 Reviews</h1>
        {/* Review Form */}
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg p-4 rounded-4 border-0">
              <h4 className="text-center mb-3 text-secondary fw-bold">
                ✨ Leave a Review
              </h4>
              <form onSubmit={handleAddReview}>
                {/* Review ID (Read-only) */}
                <div className="mb-3">
                  <label className="form-label">Review ID</label>
                  <input
                    type="number"
                    className="form-control border-0 bg-light text-dark fw-bold"
                    value={newReview.reviewID}
                    readOnly
                  />
                </div>
                {/* Hotel ID */}
                <div className="mb-3">
                  <label className="form-label">Hotel ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newReview.hotelID}
                    onChange={(e) =>
                      setNewReview({ ...newReview, hotelID: e.target.value })
                    }
                    required
                    placeholder="Enter the Hotel ID"
                  />
                </div>
                {/* Guest ID */}
                <div className="mb-3">
                  <label className="form-label">Guest ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newReview.guestID}
                    onChange={(e) =>
                      setNewReview({ ...newReview, guestID: e.target.value })
                    }
                    required
                    placeholder="Enter your Guest ID"
                  />
                </div>
                {/* Rating */}
                <div className="mb-3">
                  <label className="form-label">Rating (1-5)</label>
                  <input
  type="number"
  className="form-control"
  value={newReview.rating}
  onChange={(e) =>
    setNewReview({ ...newReview, rating: e.target.value })
  }
  required
  placeholder="Enter your rating"
  min="1"
  max="5"  // This limits the maximum rating to 5
/>

                </div>
                {/* Comment */}
                <div className="mb-3">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                    placeholder="Write your review here..."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-pill py-2"
                >
                  🚀 Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Review List */}
        <div className="mt-5">
          <h3 className="mb-3 text-secondary fw-bold">📜 Review History</h3>
          {reviews.length === 0 ? (
            <p className="text-muted text-center">No reviews available.</p>
          ) : (
            <div className="row">
              {reviews.map((review, index) => (
                <div key={review.reviewID || index} className="col-md-6">
                  <div className="card shadow-sm mb-4 rounded-4 border-0 p-3">
                    <h5 className="fw-bold">Review #{review.reviewID}</h5>
                    <p className="mb-1">
                      <strong>Hotel ID:</strong> {review.hotelID || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Guest ID:</strong> {review.guestID || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Rating:</strong> {review.rating || "N/A"}
                    </p>
                    <p className="mb-1">
                      <strong>Comment:</strong> {review.comment || "N/A"}
                    </p>
                    <p className="text-muted">
                      <strong>Date:</strong>{" "}
                      {review.reviewDate
                        ? new Date(review.reviewDate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
