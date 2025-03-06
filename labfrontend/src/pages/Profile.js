import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/');
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7085/api/Guest/refresh-token",
        {},
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } catch (error) {
      console.error("Unable to refresh token:", error);
      alert("Session expired. Please log in again.");
      navigate("/");
      return null;
    }
  };

  const checkSession = () => {
    const refreshToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('refreshToken='))
      ?.split('=')[1];

    if (!refreshToken) {
      localStorage.removeItem('user');
      alert('Your session has expired. Please log in again.');
      navigate('/login');
    }
  };

  useEffect(() => {
    const interval = setInterval(checkSession, 100000);
    return () => clearInterval(interval);
  }, []);

  const fetchProfile = async (token, guestID) => {
    try {
      const response = await axios.get(
        `https://localhost:7085/api/Guest/${guestID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setUserData(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          fetchProfile(newToken, guestID);
        }
      } else {
        console.error("Error fetching profile:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const localUserStr = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (localUserStr && token) {
      const localUser = JSON.parse(localUserStr);
      setUserData(localUser);

      if (localUser.guestID) {
        fetchProfile(token, localUser.guestID);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0 d-flex flex-column" style={{ minHeight: "450px" }}>
            <div className="card-header bg-primary text-white text-center rounded-top">
              <h3>Your Profile</h3>
            </div>
            <div className="card-body d-flex flex-column justify-content-center">
              {userData ? (
                <div className="text-center">
                 
                  <h4 className="mb-2">{`${userData.firstName} ${userData.lastName}`}</h4>
                  <p className="text-muted mb-1">{userData.email}</p>
                  <p className="text-muted mb-3">{userData.phone}</p>
                  <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => navigate("/")}
                  >
                    Back
                  </button>
                </div>
              ) : (
                <p className="text-center text-danger">No user data found.</p>
              )}
            </div>
            <div className="card-footer bg-transparent border-0">
              <button
                className="btn btn-danger w-100"
                style={{
                  borderRadius: "0 0 8px 8px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "12px 0",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
