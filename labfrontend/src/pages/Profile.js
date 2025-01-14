import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Fetch user data from localStorage on load
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setFormData(parsedUser); // Set the form data to the user data
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle save changes
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7085/api/Guest/${userData.guestID}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the backend returns the updated user data
      if (response.data) {
        const updatedUser = response.data;

        // Update userData and localStorage
        setUserData(updatedUser);
        setFormData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Profile updated successfully!");
        setIsEditing(false); // Exit editing mode
      } else {
        throw new Error("Backend did not return updated data.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Profile</h2>
      <div className="card shadow-lg">
        <div className="card-body">
          {userData ? (
            <form className="row g-3">
              {/* First Name */}
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Last Name */}
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Action Buttons */}
              <div className="col-12 text-center mt-4">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          ) : (
            <p className="text-center">Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
