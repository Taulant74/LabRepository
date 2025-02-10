// Login.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  gap: 20px;
`;

const Input = styled.input`
  font-size: 0.9rem;
  padding: 12px 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0px 4px 6px rgba(59, 130, 246, 0.2);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
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

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  font-size: 0.9rem;
  margin-top: 15px;
  color: ${(props) => (props.$error ? "red" : "green")};
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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ Email: "", Passi: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://localhost:7085/api/Guest/login",
        {
          Email: formData.Email,
          Passi: formData.Passi,
        },
        { withCredentials: true }
      );

      // Extract token and user from response
      const { token, user } = response.data;

      // Debugging
      console.log("Login successful:", user);

      // Store them in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Navigate based on role
      if (user.role?.toLowerCase() === "admin") {
        console.log("Navigating to /admin");
        navigate("/admin");
      } else {
        console.log("Navigating to /main");
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(true);
      setMessage(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FontAwesomeIcon 
  icon={faArrowLeft} 
  onClick={() => navigate('/')} 
  style={{
    position: 'absolute', 
    top: '20px', 
    left: '20px', 
    cursor: 'pointer', 
    fontSize: '1.5rem', 
    color: '#1e293b'
  }} 
  title="Go back to home"
/>

      <LoginBox>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="email"
              name="Email"
              placeholder="Email Address"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              name="Passi"
              placeholder="Password"
              value={formData.Passi}
              onChange={handleChange}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#3b82f6",
                fontSize: "1.2rem",
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            />
          </InputWrapper>

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        {message && <Message $error={error}>{message}</Message>}
        <p>Don't have an account?</p>
        <SignupLink href="/signup">Sign up here</SignupLink>
      </LoginBox>
    </PageContainer>
  );
};

export default Login;
