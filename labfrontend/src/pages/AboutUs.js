import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  const navigate = useNavigate(); 
  return (
    <>

    
      {/* Hero Section */}
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
  style={{
    position: 'absolute', 
    top: '20px', 
    left: '20px', 
    cursor: 'pointer', 
    fontSize: '1.5rem', 
    color: '#ffffff',
    zIndex: 1000
  }} 
  title="Go back to home"
/>
        <div className="container text-center">
          <h1 className="display-3 fw-bold">About Us</h1>
          <p className="lead">
            Building Innovative Solutions for a Better Tomorrow
          </p>
          <a href="#our-story" className="btn btn-primary btn-lg mt-3">
            Learn More
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-md-6">
              <img
                src="/images/story.png"
                alt="Our Story"
                className="img-fluid rounded-3 shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">Our Story</h2>
              <p className="text-muted">
                We started with a vision to revolutionize the industry by
                constantly pushing boundaries and embracing new technologies.
                Today, we are proud to have built a community of clients,
                partners, and team members who believe in our mission.
              </p>
              <p className="text-muted">
                From humble beginnings, our team has grown into a diverse group
                of professionals committed to driving success and making a
                positive impact on the world around us.
              </p>
              <a href="#mission-values" className="btn btn-outline-primary mt-3">
                Our Mission &amp; Values
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section id="mission-values" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Mission &amp; Values</h2>
            <p className="text-muted">
              A set of guiding principles that shape everything we do.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center p-4">
                <i
                  className="bi bi-lightbulb display-4 text-primary mb-3"
                  role="img"
                  aria-label="Innovation"
                ></i>
                <h5 className="fw-semibold">Innovation</h5>
                <p className="text-muted">
                  We embrace creativity and strive to stay at the cutting edge
                  of technology, ensuring that we’re always moving forward with
                  fresh ideas.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4">
                <i
                  className="bi bi-people display-4 text-primary mb-3"
                  role="img"
                  aria-label="Collaboration"
                ></i>
                <h5 className="fw-semibold">Collaboration</h5>
                <p className="text-muted">
                  We work together to achieve shared goals, building strong
                  relationships both within our team and with our partners.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center p-4">
                <i
                  className="bi bi-shield-check display-4 text-primary mb-3"
                  role="img"
                  aria-label="Integrity"
                ></i>
                <h5 className="fw-semibold">Integrity</h5>
                <p className="text-muted">
                  We hold ourselves to the highest ethical standards, ensuring
                  honesty and transparency in all that we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p className="text-muted">
              A passionate group of professionals dedicated to your success.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Team Member 1 */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow h-100">
          
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">Taulant Rama</h5>
                  <p className="text-muted small">CEO &amp; Founder</p>
                </div>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow h-100">
              
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">Rina Qerkezi</h5>
                  <p className="text-muted small">Project Manager</p>
                </div>
              </div>
            </div>
            {/* Team Member 3 */}
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow h-100">
        
                <div className="card-body text-center">
                  <h5 className="card-title mb-0">Olsa Muhaxhiri</h5>
                  <p className="text-muted small">Lead Engineer</p>
                </div>
              </div>
            </div>
         
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-primary text-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to Work With Us?</h2>
          <p className="lead mb-4">
            Get in touch today and let's start building something great together.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
