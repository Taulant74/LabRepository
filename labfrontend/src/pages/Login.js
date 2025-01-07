import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
  font-family: "Poppins", sans-serif;
`;

const LoginBox = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 360px;
  text-align: center;
`;

const Title = styled.h1`
  color: #1e293b;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  font-size: 0.9rem;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
  width: 90%;
  margin: 0 auto;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0px 4px 6px rgba(59, 130, 246, 0.2);
  }
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

const SignupLink = styled.a`
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

// Login Component
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", Passi: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7085/api/Guest/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("Login successful!");
        setError(false);

        // Redirect to the main page
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setMessage("Invalid email or password.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
      setError(true);
    }
  };

  return (
    <PageContainer>
      <LoginBox>
        <Title>Login</Title>
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={formData.Email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="Passi"
            placeholder="Password"
            value={formData.Passi}
            onChange={handleChange}
            required
          />

          <Button type="submit">Log In</Button>
          
        </Form>
        {message && <Message error={error}>{message}</Message>}
        <br></br>
        <p>Don't have an account?</p>
        <SignupLink href="/signup">Continue here</SignupLink>
      </LoginBox>
    </PageContainer>
  );
};

export default Login;
