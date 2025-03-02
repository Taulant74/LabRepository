import ReactDOM from "react-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';
// Styled-components
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  line-height: 1.6;
`;
const Header = styled.header`
  background-color: #5C6AC4; /* Royal Blue */
  color: #f9f9fc; /* Soft Gray */
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem; /* Small font size for the logo */
  font-weight: 700;
  margin-left: 15px; /* Slightly reduced margin */
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px; /* Space between navigation links */
`;

const NavLink = styled.a`
  color: #f9f9fc; /* Soft Gray */
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 5px 10px;
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #A3A1F7; /* Lavender */
    color: #1f2937; /* Dark Gray */
  }
`;

const LoginButton = styled.button`
  background-color: #ECC94B; /* Gold */
  color: #1f2937; /* Dark Gray */
  padding: 8px 15px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #F4A261; /* Peach Orange */
  }
`;


const Hero = styled.section`
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url('/images/background1.jpg');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9f9fc; /* Soft Gray */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const HeroContent = styled.div`
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 40px;
  border-radius: 10px;
`;

const AboutSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 60px 20px;
  background-color: #f8f8f8;
`;

const AboutImage = styled.div`
  flex: 1;
  min-width: 300px;
  height: 400px;
  background-image: url('/images/background2.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin: 10px;
`;

const AboutContent = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 20px;
  text-align: left;
`;
const AboutTitle = styled.h2`
  font-size: 2.5rem;
  color:rgb(0, 0, 0); /* Royal Blue */
  font-weight: bold;
  margin-bottom: 20px;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  color: #1F2937; /* Dark Gray */
  line-height: 1.8;
`;

const AboutButton = styled.button`
  background-color:rgb(238, 164, 44); /* Gold */
  color:rgb(255, 255, 255); /* Dark Gray */
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #F4A261; /* Peach Orange */
    transform: translateY(-3px);
  }
`;

const RoomsSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 60px 20px;
  background-color: #fff;
`;

const RoomsImageSlider = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  padding: 10px;

  .slider-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const RoomsContent = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 20px;
  text-align: left;
`;

const RoomsTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const RoomsText = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8;
  max-width: 600px;
`;

const RoomsButton = styled.button`
  background-color: #e67e22;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #d35400;
  }
`;

const AmenitiesSection = styled.section`
  padding: 80px 20px;
  text-align: center;
  background-color: #f8f8f8;
`;

const AmenitiesTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color:rgb(0, 0, 0); /* Royal Blue */
  margin-bottom: 30px;
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const AmenityCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const AmenityIcon = styled.div`
  font-size: 3rem;
  color: #e67e22;
  margin-bottom: 15px;
`;

const AmenityName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937; /* Dark Gray */
  margin-bottom: 10px;
`;

const AmenityDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  max-width: 300px;
  margin: 0 auto;
`;


const AmenitiesButton = styled.button`
  background-color:rgb(242, 168, 65); /* Gold */
  color:rgb(255, 255, 255); /* Dark Gray */
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 40px;

  &:hover {
    background-color: #F4A261; /* Peach Orange */
    transform: translateY(-3px);
  }
`;

const FeedbackSection = styled.section`
  padding: 80px 20px;
  background-color: #f8f8f8;
  text-align: center;
`;

const FeedbackTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
`;

const FeedbackButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #e67e22;
  color: #fff;
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d35400;
    transform: scale(1.05);
  }

  svg {
    margin-left: 10px;
    font-size: 1.8rem;
  }
`;


const AmenitiesComponent = () => {
  const amenities = [
    { icon: "🛏️", name: "Luxury Suites", description: "Spacious and elegantly designed suites." },
    { icon: "🍽️", name: "Fine Dining", description: "A wide variety of gourmet dishes and beverages." },
    { icon: "🏋️", name: "Fitness Center", description: "State-of-the-art gym facilities available 24/7." },
    { icon: "🏊", name: "Swimming Pool", description: "Relax and unwind in our outdoor pool." },
    { icon: "💻", name: "Business Center", description: "Fully equipped for all your business needs." },
    { icon: "🌴", name: "Spa Services", description: "Experience ultimate relaxation with our spa treatments." },
  ];

  return (
    <AmenitiesSection id="amenities">
      <AmenitiesTitle>Our Amenities</AmenitiesTitle>
      <AmenitiesGrid>
        {amenities.map((amenity, index) => (
          <AmenityCard key={index}>
            <AmenityIcon>{amenity.icon}</AmenityIcon>
            <AmenityName>{amenity.name}</AmenityName>
            <AmenityDescription>{amenity.description}</AmenityDescription>
          </AmenityCard>
        ))}
      </AmenitiesGrid>
      <Link to ="/amenities">
      <AmenitiesButton>View All Amenities</AmenitiesButton>
      </Link>
    </AmenitiesSection>
  );
};

const RoomsSectionComponent = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <RoomsSection id="rooms"  style={{ minHeight: "90vh" }}>
      <RoomsImageSlider>
        <Slider {...sliderSettings}>
          <div>
            <img
              src="/images/background3.jpg"
              alt="Room 1"
              className="slider-image"
            />
          </div>
          <div>
            <img
              src="/images/background4.jpg"
              alt="Room 2"
              className="slider-image"
            />
          </div>
          <div>
            <img
              src="/images/background5.jpg"
              alt="Room 3"
              className="slider-image"
            />
          </div>
        </Slider>
      </RoomsImageSlider>
      <RoomsContent>
        <RoomsTitle>Our Rooms</RoomsTitle>
        <RoomsText>
          Choose from a variety of elegantly designed rooms and suites, each
          equipped with modern amenities to provide the utmost comfort and
          convenience during your stay.
        </RoomsText>
        <Link to={'/rooms'}>
        <RoomsButton>View All Rooms</RoomsButton>
        </Link>
      </RoomsContent>
    </RoomsSection>
  );
};

const FeedbackSectionComponent = () => {
  return (
    <FeedbackSection id="feedback" className="text-center py-5 bg-light"  style={{ minHeight: "20vh" }}>
    <h2 className="mb-4">We Value Your Feedback</h2>
    <Link to="/feedback">
      <button className="btn btn-warning btn-lg">
        Share Feedback <i className="fas fa-comment-alt"></i>
      </button>
    </Link>
  </FeedbackSection>
  
  );
};
const Footer = styled.footer`
  background-color: #1a1a1a;
  color: #f8f8f8;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
`;

const MainPage = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);
  
  return (
    <Container>
      {/* Header */}
      <Header className="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
  <Logo className="m-0">Dardania Heights</Logo>
  <Nav className="d-flex gap-3">
    <a href="#about" className="text-white text-decoration-none">About Us</a>
    <a href="#rooms" className="text-white text-decoration-none">Rooms</a>
    <a href="#amenities" className="text-white text-decoration-none">Amenities</a>
    <a href="#feedback" className="text-white text-decoration-none">Feedback</a>
    <a href="#event" className="text-white text-decoration-none">Events</a>
  </Nav>
  <div className="d-flex align-items-center">
  {!loggedInUser ? (
    <Link to="/login">
      <button className="btn btn-warning">Login</button>
    </Link>
  ) : (
    <FaUserCircle
      onClick={() => navigate('/profile')}
      style={{
        fontSize: '2rem',
        color: '#ECC94B', // Same gold color as your button
        cursor: 'pointer',
        marginLeft: '10px',
      }}
      title="Go to Profile"
    />
  )}
</div>

  
</Header>


      {/* Hero Section */}
      <Hero className="d-flex justify-content-center align-items-center text-center text-white" style={{ minHeight: "90vh" }}>
  <div className="bg-dark bg-opacity-50 p-4 rounded">
    <h1>Welcome to Dardania Heights</h1>
    <p>Discover comfort, elegance, and exceptional service.</p>
    
    <Link to={'/reservation'}>
    <button className="btn btn-warning btn-lg">Book Now</button>
    </Link>
  </div>
</Hero>


      {/* About Us Section */}
      <AboutSection id="about">
  <AboutImage />
  <AboutContent>
    <AboutTitle>About Us</AboutTitle>
    <AboutText>
      Nestled in the heart of the city, our hotel offers unparalleled luxury
      and exceptional service. Whether you're here for business or leisure, we
      ensure a memorable stay with world-class amenities and personalized
      attention.
    </AboutText>
    <Link to="/about">
      <AboutButton>Learn More</AboutButton>
    </Link>
  </AboutContent>
</AboutSection>



      {/* Amenities Section */}
      <AmenitiesComponent />

      {/* Rooms Section */}
      <RoomsSectionComponent />

      <FeedbackSectionComponent />
      {/* Footer */}
      <Footer className="bg-dark text-white py-3 text-center">
  &copy; {new Date().getFullYear()} Dardania Heights. All rights reserved.
</Footer>

    </Container>
  );
};

export default MainPage;
