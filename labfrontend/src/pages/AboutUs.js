import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">Dardania Heights</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/rooms">Rooms</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/amenities">Amenities</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/feedback">Feedback</Link></li>
              <li className="nav-item"><Link className="nav-link fw-bold text-dark" to="/event">Events</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <section
        className="bg-dark text-light d-flex align-items-center"
        style={{
          minHeight: "60vh",
          backgroundImage: "url('/images/about.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          onClick={() => navigate('/')} 
          className="position-absolute top-0 start-0 m-3 fs-3 text-white" 
          style={{ cursor: 'pointer', zIndex: 1000 }} 
          title="Go back to home"
        />
        <div className="container text-center">
          <h1 className="display-3 fw-bold">About Us</h1>
          <p className="lead">Building Innovative Solutions for a Better Tomorrow</p>
          <a href="#our-story" className="btn btn-primary btn-lg mt-3">Learn More</a>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
