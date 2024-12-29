import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Styled-components
const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  line-height: 1.6;
`;
const Header = styled.header`
  background-color: #1a1a1a;
  color: #f8f8f8;
  padding: 5px 0; /* Short height */
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
  color: #f8f8f8;
  text-decoration: none;
  font-weight: 600; /* Increased font weight */
  padding: 3px 8px; /* Compact padding */
  font-size: 1.1rem; /* Larger font size for links */
  border-radius: 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f8f8f8;
    color: #1a1a1a;
  }
`;

const LoginButton = styled.button`
  background-color: #e67e22;
  color: #fff;
  padding: 5px 12px; /* Compact padding */
  font-size: 1.1rem; /* Larger font size for the button */
  font-weight: 600;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 15px;

  &:hover {
    background-color: #d35400;
  }
`;


const Hero = styled.section`
  background-image: url('/images/background1.jpg');
  background-size: cover;
  background-position: center;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f8f8f8;
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
  margin-bottom: 20px;
  color: #333;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8;
  max-width: 600px;
`;

const AboutButton = styled.button`
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
  font-size: 3rem;
  margin-bottom: 20px;
  color: #333;
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
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
`;

const AmenityDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
`;

const AmenitiesButton = styled.button`
  background-color: #e67e22;
  color: #fff;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 40px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d35400;
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
      <AmenitiesButton>View All Amenities</AmenitiesButton>
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
    <RoomsSection id="rooms">
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
        <RoomsButton>View All Rooms</RoomsButton>
      </RoomsContent>
    </RoomsSection>
  );
};

const FeedbackSectionComponent = () => {
  return (
    <FeedbackSection id="feedback">
      <FeedbackTitle>We Value Your Feedback</FeedbackTitle>
      <FeedbackButton href="/feedback">
        Share Feedback <i className="fas fa-comment-alt"></i>
      </FeedbackButton>
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
  return (
    <Container>
      {/* Header */}
      <Header>
        <Logo>Dardania Heights</Logo>
        <Nav>
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#rooms">Rooms</NavLink>
          <NavLink href="#amenities">Amenities</NavLink>
          <NavLink href="#gallery">Gallery</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Nav>
        <LoginButton>Login</LoginButton>
      </Header>

      {/* Hero Section */}
      <Hero>
        <HeroContent>
          <h1>Welcome to Dardania Heights</h1>
          <p>Discover comfort, elegance, and exceptional service.</p>
          <button
            style={{
              backgroundColor: "#e67e22",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </HeroContent>
      </Hero>

      {/* About Us Section */}
      <AboutSection id="about">
        <AboutImage />
        <AboutContent>
          <AboutTitle>About Us</AboutTitle>
          <AboutText>
            Nestled in the heart of the city, our hotel offers unparalleled
            luxury and exceptional service. Whether you're here for business or
            leisure, we ensure a memorable stay with world-class amenities and
            personalized attention.
          </AboutText>
          <AboutButton>Learn More</AboutButton>
        </AboutContent>
      </AboutSection>

      {/* Amenities Section */}
      <AmenitiesComponent />

      {/* Rooms Section */}
      <RoomsSectionComponent />

      <FeedbackSectionComponent />
      {/* Footer */}
      <Footer>
        &copy; {new Date().getFullYear()} Luxury Stay. All rights reserved.
      </Footer>
    </Container>
  );
};

export default MainPage;
