import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  font-family: "Poppins", sans-serif;
`;

const SignupBox = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  color: #1e293b;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const SubTitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  font-size: 0.9rem;
  padding: 10px 12px;
  border: 1px solid ${(props) => (props.error ? "red" : "#d1d5db")};
  border-radius: 8px;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
  width: 90%;
  margin: 0 auto;

  &:focus {
    border-color: ${(props) => (props.error ? "red" : "#3b82f6")};
    box-shadow: 0px 4px 6px
      ${(props) => (props.error ? "rgba(255, 0, 0, 0.3)" : "rgba(59, 130, 246, 0.2)")};
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #999;
    cursor: not-allowed;
  }
`;

const InputInfo = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin: -10px auto 10px;
  text-align: left;
  width: 90%;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Button = styled.button`
  background: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  font-size: 0.9rem;
  margin-top: 15px;
  color: ${(props) => (props.error ? "red" : "green")};
`;

const LoginLink = styled.a`
  display: block;
  margin-top: 15px;
  font-size: 0.85rem;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #2563eb;
  }
`;

// Signup Component
const Signup = () => {
  const [formData, setFormData] = useState({
    GuestID: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Passi: "",
  });

  const [nextGuestID, setNextGuestID] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [showInfo, setShowInfo] = useState({
    Email: false,
    Phone: false,
    Passi: false,
  });

  // Fetch the next available GuestID
  useEffect(() => {
    const fetchNextGuestID = async () => {
      try {
        const response = await axios.get("https://localhost:7085/api/Guest");
        const guests = response.data;
        const maxID = guests.reduce((max, guest) => Math.max(max, guest.guestID || 0), 0);
        setNextGuestID(maxID + 1);
        setFormData((prevState) => ({ ...prevState, GuestID: maxID + 1 }));
      } catch (err) {
        console.error("Error fetching GuestID:", err.message);
        setMessage("Error fetching the next available GuestID.");
        setError(true);
      }
    };

    fetchNextGuestID();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowInfo((prevState) => ({ ...prevState, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage("");

    if (formData.Passi.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setError(true);
      return;
    }

    try {
      const response = await axios.post("https://localhost:7085/api/Guest", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Signup successful!");
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorDetails = err.response.data.errors;

        if (errorDetails.Email) {
          setMessage("Email is already in use.");
        } else if (errorDetails.Phone) {
          setMessage("Phone number is already in use.");
        } else {
          setMessage("Failed to register. Please check your input.");
        }
      } else {
        setMessage("Failed to register. Please check your input.");
      }
      setError(true);
    }
  };

  return (
    <PageContainer>
      <SignupBox>
        <Title>Create an Account</Title>
        <SubTitle>
          Fill in the details to get started. <br />
          The next available Guest ID is <strong>{nextGuestID}</strong>.
        </SubTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="GuestID"
            placeholder="Guest ID"
            value={formData.GuestID}
            disabled
            required
          />
          <Input
            type="text"
            name="FirstName"
            placeholder="First Name"
            value={formData.FirstName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="LastName"
            placeholder="Last Name"
            value={formData.LastName}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <InputInfo show={showInfo.Email}>Email must be unique.</InputInfo>
          <Input
            type="text"
            name="Phone"
            placeholder="Phone Number"
            value={formData.Phone}
            onChange={handleChange}
            required
          />
          <InputInfo show={showInfo.Phone}>Phone number must be unique.</InputInfo>
          <Input
            type="password"
            name="Passi"
            placeholder="Password"
            value={formData.Passi}
            onChange={handleChange}
            required
          />
          <br></br>
          <InputInfo show={showInfo.Passi}>Password must be at least 8 characters long.</InputInfo>
          <Button type="submit">Sign Up</Button>
        </Form>
        <br></br>
        {message && <Message error={error}>{message}</Message>}
        <p>Already have an account?</p>
        <LoginLink href="/login">Login here</LoginLink>
      </SignupBox>
    </PageContainer>
  );
};

export default Signup;
