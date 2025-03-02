import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { FaStar } from 'react-icons/fa';  // For star icons

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    { name: 'John Doe', comment: 'Amazing service and comfortable rooms!', date: '2025-01-01', imageUrl: '/images/p2.jpg', rating: 5 },
    { name: 'Jane Smith', comment: 'Great location and friendly staff!', date: '2025-01-02', imageUrl: '/images/p1.jpg', rating: 4 },
    { name: 'Emily Johnson', comment: 'Exceptional cleanliness and hospitality!', date: '2025-01-03', imageUrl: '/images/p4.jpg', rating: 5 },
    { name: 'Olsa Muhaxhiri', comment: 'Shum me ka pelqyer , eksperience e paharrueshme, e gzofshit jeni te mrekullueshem!', date: '2025-01-04', imageUrl: '/images/olsa.jpg', rating: 4 },
  ]);

  const [newFeedback, setNewFeedback] = useState({ name: '', comment: '', rating: 5 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFeedback.name && newFeedback.comment) {
      setFeedbacks([
        ...feedbacks,
        {
          ...newFeedback,
          date: new Date().toISOString().split('T')[0],
          imageUrl: '/images/p1.jpg', // Use a default image for new feedback
        },
      ]);
      setNewFeedback({ name: '', comment: '', rating: 5 });
    }
  };

  // Calculate average rating
  const averageRating = (feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length).toFixed(1);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Dardania Heights</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
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

      {/* Cover Photo */}
      <div className="cover-photo">
        <img src="/images/review.jpg" alt="Cover Photo" className="img-fluid" />
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4 animated-title">Top 5 Forbes Hotels of 2025</h2>

        <div className="text-center mb-5">
          <h3 className="animated-stat">
            <span>{feedbacks.length}</span> Reviews
          </h3>
          <h4 className="animated-stat">
            <span>{averageRating}</span> Star Rating
          </h4>
        </div>

        {/* Hotel Image Carousel */}
        <div className="hotel-carousel mb-5">
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-100" src="/images/c1.jpg" alt="Hotel Image 1" />
              <Carousel.Caption>
                <h3>Luxury Rooms</h3>
                <p>Experience the comfort and elegance of our luxurious rooms.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="/images/c2.jpg" alt="Hotel Image 2" />
              <Carousel.Caption>
                <h3>Relax by the Pool</h3>
                <p>Enjoy a refreshing swim in our beautiful pool.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src="/images/c3.jpg" alt="Hotel Image 3" />
              <Carousel.Caption>
                <h3>Stunning View</h3>
                <p>Admire the breathtaking views of the city from our rooftop.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <Carousel className="mb-5">
          {feedbacks.map((feedback, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex flex-column align-items-center">
                <img
                  className="rounded-circle mb-3"
                  src={feedback.imageUrl}
                  alt={feedback.name}
                  style={{ width: '150px', height: '150px' }}
                />
                <div className="text-center">
                  <h5>{feedback.name}</h5>
                  <p>{feedback.comment}</p>
                  <p className="text-muted"><small>{feedback.date}</small></p>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color={i < feedback.rating ? "#FFD700" : "#e4e5e9"} />
                    ))}
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <h4 className="mb-3">Add Your Feedback</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newFeedback.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              rows="3"
              value={newFeedback.comment}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="rating" className="form-label">Rating</label>
            <select
              className="form-control"
              id="rating"
              name="rating"
              value={newFeedback.rating}
              onChange={handleInputChange}
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit Feedback</button>
        </form>
      </div>

      <footer className="bg-light py-4">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .cover-photo img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          object-position: top;
          margin-bottom: 20px;
        }

        .animated-title {
          animation: fadeIn 2s ease-in-out;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .animated-stat span {
          font-size: 2rem;
          font-weight: bold;
          animation: numberAnimation 2s ease-out forwards;
        }

        @keyframes numberAnimation {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stars svg {
          margin-right: 5px;
        }

        .hotel-carousel .carousel-item img {
          height: 500px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Feedback;
