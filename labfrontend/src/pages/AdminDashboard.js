import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft, FaArrowRight, FaUser, FaBox, FaUsers, FaTools, FaCalendarAlt, FaEdit, FaTrashAlt,FaClipboardList ,FaDumbbell, FaHotTub, FaSpa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



// Inline styles for components
const styles = {
  layout: {

    
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "240px",
    background: "#001529",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    padding: "16px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    borderBottom: "1px solid #333",
  },
  sidebarMenu: {
    flex: 1,
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  sidebarMenuItem: {
    padding: "12px 16px",
    cursor: "pointer",
    color: "#fff",
  },
  sidebarMenuItemActive: {
    background: "#1890ff",
  },
  header: {
    background: "#fff",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
  },
  headerTitle: {
    fontSize: "20px",
    margin: 0,
  },
  headerButton: {
    padding: "8px 16px",
    background: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  
  content: {
    padding: "16px",
    flex: 1,
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "16px",
  }
  
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("guests");
  const [guests, setGuests] = useState([]);
  const [editGuest, setEditGuest] = useState(null);
  const [notification, setNotification] = useState("");
  const [inventory, setInventory] = useState([]);
const [editInventory, setEditInventory] = useState(null);
const [newInventory, setNewInventory] = useState(null);
const [showSupplierModal, setShowSupplierModal] = useState(false);
const [suppliers, setSuppliers] = useState([]);
const [editSupplier, setEditSupplier] = useState(null); // For editing supplier
const [newSupplier, setNewSupplier] = useState(null); // State for adding new supplier
const [staff, setStaff] = useState([]);
const [editStaff, setEditStaff] = useState(null);
const [newStaff, setNewStaff] = useState(null);
const [maintenanceRequests, setMaintenanceRequests] = useState([]);
const [editMaintenanceRequest, setEditMaintenanceRequest] = useState(null);
const [newMaintenanceRequest, setNewMaintenanceRequest] = useState(null);
const [employeeSchedules, setEmployeeSchedules] = useState([]);
const [editSchedule, setEditSchedule] = useState(null);
const [newSchedule, setNewSchedule] = useState(null);
const [schedules, setSchedules] = useState([]);
const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
const [rooms, setRooms] = useState([]);
const [newRoom, setNewRoom] = useState(null); // For adding a new room
const [editRoom, setEditRoom] = useState(null); // For editing a room
const [reviews, setReviews] = useState([]);
const [newReview, setNewReview] = useState(null);
const [editReview, setEditReview] = useState(null);
const [amenities, setAmenities] = useState([]);
const [newAmenity, setNewAmenity] = useState(null);
const [editAmenity, setEditAmenity] = useState(null);
const [currentPage, setCurrentPage] = useState(0);
const rowsPerPage = 7; // Show 7 rooms per page
const [reservations, setReservations] = useState([]);
const [editReservation, setEditReservation] = useState(null);
const [newReservation, setNewReservation] = useState(null);
const [sessionExpired, setSessionExpired] = useState(false);
const [gyms, setGyms] = useState([]);
const [editGym, setEditGym] = useState(null);
const [newGym, setNewGym] = useState(null);
const [saunas, setSaunas] = useState([]);
const [editSauna, setEditSauna] = useState(null);
const [newSauna, setNewSauna] = useState(null);
const [spas, setSpas] = useState([]);
const [editSpa, setEditSpa] = useState(null);
const [newSpa, setNewSpa] = useState(null);

const navigate = useNavigate();


useEffect(() => {
  const checkTokenExpiration = () => {
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken && !sessionExpired) {
      setSessionExpired(true); // Show the expiration message
      setTimeout(() => {
        navigate("/login"); // Redirect after 3 seconds
      }, 3000);
    }
  };

  const interval = setInterval(checkTokenExpiration, 100000); // Check every 10 seconds

  return () => clearInterval(interval); // Cleanup
}, [navigate, sessionExpired]);
// Check if refresh token is expired
const checkSession = () => {
  const refreshToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('refreshToken='))
    ?.split('=')[1];

  if (!refreshToken) {
    // Clear user session from localStorage when token expires
    localStorage.removeItem('user');

    // Show session expired message (if needed)
    alert('Your session has expired. Please log in again.');

    // Redirect to login
    window.location.href = '/login';
  }
};

// Run the session check when the component mounts
useEffect(() => {
  const interval = setInterval(checkSession, 100000); // Check every 2 seconds
  return () => clearInterval(interval); // Clean up interval on unmount
}, []);



const handleLogout = () => {
  // Clear the user from localStorage
  localStorage.removeItem('user');

  // Clear the refresh token cookie (if applicable)
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  // Redirect to login page
  window.location.href = '/login';
};
const fetchSpas = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/Spa");
    setSpas(response.data);
  } catch (error) {
    console.error("Error fetching spas:", error);
    if (error.response) {
      console.error("Server response data:", error.response.data); // Log server error details
    }
    showNotification("Failed to fetch spas.");
  }
};
const fetchSaunas = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/Sauna");
    setSaunas(response.data);
  } catch (error) {
    console.error("Error fetching saunas:", error);
    if (error.response) {
      console.error("Server response data:", error.response.data); // Log server error details
    }
    showNotification("Failed to fetch saunas.");
  }
};

const fetchGyms = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/Gym");
    setGyms(response.data);
  } catch (error) {
    console.error("Error fetching gyms:", error);
  }
};


const fetchAmenities = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/Amenity");
    console.log("Amenities fetched from API:", response.data); // Log fetched data
    setAmenities(response.data);
console.log("Updated amenities state:", response.data);
  } catch (error) {
    console.error("Error fetching amenities:", error); // Log errors
  }
};

const fetchReservations = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/Reservation");
    setReservations(response.data);
  } catch (error) {
    console.error("Error fetching reservations:", error);
  }
};
useEffect(() => {
  if (activeTab === "gyms") {
    fetchGyms();
  }
}, [activeTab]);
// Fetch when tab is active
useEffect(() => {
  if (activeTab === "reservations") {
    fetchReservations();
  }
}, [activeTab]);
const handleAddReservation = async () => {
  try {
    await axios.post("https://localhost:7085/api/Reservation", newReservation);
    fetchReservations();
    setNewReservation(null);
    alert("Reservation added successfully!");
  } catch (error) {
    console.error("Error adding reservation:", error);
    alert("Failed to add reservation.");
  }
};
const handleUpdateReservation = async () => {
  try {
    await axios.put(
      `https://localhost:7085/api/Reservation/${editReservation.reservationID}`,
      editReservation
    );
    fetchReservations();
    setEditReservation(null);
    alert("Reservation updated successfully!");
  } catch (error) {
    console.error("Error updating reservation:", error);
    alert("Failed to update reservation.");
  }
};
const handleDeleteReservation = async (reservationID) => {
  if (!window.confirm("Are you sure you want to delete this reservation?")) return;

  try {
    await axios.delete(`https://localhost:7085/api/Reservation/${reservationID}`);

    // Remove the deleted reservation from state
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.reservationID !== reservationID)
    );

    // Show notification
    setNotification(`Reservation ${reservationID} deleted successfully.`);
    setTimeout(() => setNotification(""), 2000); // Hide after 2 seconds

  } catch (error) {
    console.error("Error deleting reservation:", error);
    alert("Failed to delete reservation. Please try again.");
  }
};



const handleAddAmenity = async () => {
  try {
    await axios.post("https://localhost:7085/api/Amenity", newAmenity);
    fetchAmenities();
    setNewAmenity(null);
    showNotification("Amenity added successfully!");
  } catch (error) {
    console.error("Error adding amenity:", error);
    showNotification("Failed to add amenity.");
  }
};

const handleUpdateAmenity = async () => {
  try {
    await axios.put(
      `https://localhost:7085/api/Amenity/${editAmenity.amenityID}`,
      editAmenity
    );
    fetchAmenities();
    setEditAmenity(null);
    showNotification("Amenity updated successfully!");
  } catch (error) {
    console.error("Error updating amenity:", error);
    showNotification("Failed to update amenity.");
  }
};

const handleDeleteAmenity = async (id) => {
  try {
    await axios.delete(`https://localhost:7085/api/Amenity/${id}`);
    fetchAmenities();
    showNotification("Amenity deleted successfully!");
  } catch (error) {
    console.error("Error deleting amenity:", error);
    showNotification("Failed to delete amenity.");
  }
};
const handleAddGym = async () => {
  try {
    await axios.post("https://localhost:7085/api/Gym", newGym);
    fetchGyms();
    setNewGym(null);
    showNotification("Gym added successfully!");
  } catch (error) {
    console.error("Error adding gym:", error);
    showNotification("Failed to add gym.");
  }
};
const handleUpdateGym = async () => {
  try {
    await axios.put(`https://localhost:7085/api/Gym/${editGym.GymID}`, editGym);
    fetchGyms();
    setEditGym(null);
    showNotification("Gym updated successfully!");
  } catch (error) {
    console.error("Error updating gym:", error);
    showNotification("Failed to update gym.");
  }
};
const handleDeleteGym = async (id) => {
  try {
    await axios.delete(`https://localhost:7085/api/Gym/${id}`);
    fetchGyms();
    showNotification("Gym deleted successfully!");
  } catch (error) {
    console.error("Error deleting gym:", error);
    showNotification("Failed to delete gym.");
  }
};

const handleAddSauna = async () => {
  try {
    await axios.post("https://localhost:7085/api/Sauna", newSauna);
    fetchSaunas();
    setNewSauna(null);
    showNotification("Sauna added successfully!");
  } catch (error) {
    console.error("Error adding sauna:", error);
    showNotification("Failed to add sauna.");
  }
};

const handleUpdateSauna = async () => {
  try {
    await axios.put(`https://localhost:7085/api/Sauna/${editSauna.SaunaID}`, editSauna);
    fetchSaunas();
    setEditSauna(null);
    showNotification("Sauna updated successfully!");
  } catch (error) {
    console.error("Error updating sauna:", error);
    showNotification("Failed to update sauna.");
  }
};

const handleDeleteSauna = async (id) => {
  try {
    await axios.delete(`https://localhost:7085/api/Sauna/${id}`);
    fetchSaunas();
    showNotification("Sauna deleted successfully!");
  } catch (error) {
    console.error("Error deleting sauna:", error);
    showNotification("Failed to delete sauna.");
  }
};
const handleAddSpa = async () => {
  try {
    await axios.post("https://localhost:7085/api/Spa", newSpa);
    fetchSpas();
    setNewSpa(null);
    showNotification("Spa added successfully!");
  } catch (error) {
    console.error("Error adding spa:", error);
    showNotification("Failed to add spa.");
  }
};
const handleUpdateSpa = async () => {
  try {
    await axios.put(`https://localhost:7085/api/Spa/${editSpa.SpaID}`, editSpa);
    fetchSpas();
    setEditSpa(null);
    showNotification("Spa updated successfully!");
  } catch (error) {
    console.error("Error updating spa:", error);
    showNotification("Failed to update spa.");
  }
};
const handleDeleteSpa = async (id) => {
  try {
    await axios.delete(`https://localhost:7085/api/Spa/${id}`);
    fetchSpas();
    showNotification("Spa deleted successfully!");
  } catch (error) {
    console.error("Error deleting spa:", error);
    showNotification("Failed to delete spa.");
  }
};

const fetchRooms = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/Room");
    setRooms(response.data);
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};


const fetchSchedules = async () => {
  try {
    const response = await axios.get("https://localhost:7085/api/EmployeeSchedule");
    setSchedules(response.data);
  } catch (error) {
    console.error("Error fetching schedules:", error.message);
  }
};

useEffect(() => {
  switch (activeTab) {
    case "inventory":
      fetchInventory();
      break;
    case "guests":
      fetchGuests();
      break;
    case "staff":
      fetchStaff();
      break;
    case "maintenanceRequests":
      fetchMaintenanceRequests();
      break;
    case "employeeSchedule":
      fetchEmployeeSchedules();
      break;
    default:
      break;
  }
}, [activeTab]);

useEffect(() => {
  if (activeTab === "rooms") {
    fetchRooms();
  }
}, [activeTab]);

useEffect(() => {
  if (activeTab === "amenities") {
    fetchRooms();
  }
}, [activeTab]);


useEffect(() => {
    if (activeTab === "inventory") {
      fetchInventory();
    }
  }, [activeTab]);
  
  useEffect(() => {
    if (activeTab === "guests") {
      fetchGuests();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "staff") {
      fetchStaff();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "employeeSchedule") {
      fetchEmployeeSchedules();
    }
  }, [activeTab]);
  
  useEffect(() => {
    if (activeTab === "maintenanceRequests") {
      fetchMaintenanceRequests();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "reviews") {
      fetchReviews();
    }
  }, [activeTab]);

  

  useEffect(() => {
    if (activeTab === "saunas") {
      fetchSaunas();
    }
  }, [activeTab]);
  useEffect(() => {
    if (activeTab === "spas") {
      fetchSpas();
    }
  }, [activeTab]);
  


  const fetchGuests = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Guest");
      setGuests(response.data);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Supplier");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };
  
  const fetchInventory = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Inventory");
      setInventory(response.data); // Use data directly
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };
  const fetchStaff = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Staff");
      setStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };
  const fetchEmployeeSchedules = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/EmployeeSchedule");
      setEmployeeSchedules(response.data);
    } catch (error) {
      console.error("Error fetching employee schedules:", error);
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/Review");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  
  const handleAddReview = async () => {
    try {
      await axios.post("https://localhost:7085/api/Review", newReview);
      fetchReviews();
      setNewReview(null);
      showNotification("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
      showNotification("Failed to add review.");
    }
  };
  
  const handleUpdateReview = async () => {
    try {
      await axios.put(`https://localhost:7085/api/Review/${editReview.reviewID}`, editReview);
      fetchReviews();
      setEditReview(null);
      showNotification("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      showNotification("Failed to update review.");
    }
  };
  
  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`https://localhost:7085/api/Review/${id}`);
      fetchReviews();
      showNotification("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      showNotification("Failed to delete review.");
    }
  };
  
  const fetchMaintenanceRequests = async () => {
    try {
      const response = await axios.get("https://localhost:7085/api/MaintenanceRequest");
      setMaintenanceRequests(response.data);
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
    }
  };
  const handleAddMaintenanceRequest = async () => {
    try {
      await axios.post("https://localhost:7085/api/MaintenanceRequest", newMaintenanceRequest);
      fetchMaintenanceRequests();
      setNewMaintenanceRequest(null);
      showNotification("Maintenance request added successfully!");
    } catch (error) {
      console.error("Error adding maintenance request:", error);
      showNotification("Failed to add maintenance request.");
    }
  };
  const handleUpdateMaintenanceRequest = async () => {
    try {
      await axios.put(
        `https://localhost:7085/api/MaintenanceRequest/${editMaintenanceRequest.requestID}`,
        editMaintenanceRequest
      );
      fetchMaintenanceRequests();
      setEditMaintenanceRequest(null);
      showNotification("Maintenance request updated successfully!");
    } catch (error) {
      console.error("Error updating maintenance request:", error);
      showNotification("Failed to update maintenance request.");
    }
  };
  const handleDeleteMaintenanceRequest = async (id) => {
    try {
      await axios.delete(`https://localhost:7085/api/MaintenanceRequest/${id}`);
      fetchMaintenanceRequests();
      showNotification("Maintenance request deleted successfully!");
    } catch (error) {
      console.error("Error deleting maintenance request:", error);
      showNotification("Failed to delete maintenance request.");
    }
  };
  const handleAddRoom = async () => {
    try {
      await axios.post("https://localhost:7085/api/Room", newRoom);
      fetchRooms();
      setNewRoom(null);
      showNotification("Room added successfully!");
    } catch (error) {
      console.error("Error adding room:", error);
      showNotification("Failed to add room.");
    }
  };
  const handleUpdateRoom = async () => {
    try {
      await axios.put(`https://localhost:7085/api/Room/${editRoom.roomID}`, editRoom);
      fetchRooms();
      setEditRoom(null);
      showNotification("Room updated successfully!");
    } catch (error) {
      console.error("Error updating room:", error);
      showNotification("Failed to update room.");
    }
  };
  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`https://localhost:7085/api/Room/${id}`);
      fetchRooms();
      showNotification("Room deleted successfully!");
    } catch (error) {
      console.error("Error deleting room:", error);
      showNotification("Failed to delete room.");
    }
  };
      
  
  
  const handleAddInventory = async () => {
    try {
      const inventoryData = { ...newInventory }; // Prepare new inventory data
      await axios.post("https://localhost:7085/api/Inventory", inventoryData); // Make POST request
      fetchInventory(); // Refresh inventory list
      setNewInventory(null); // Close modal
      showNotification("Inventory added successfully!");
    } catch (error) {
      console.error("Error adding inventory:", error);
      showNotification("Failed to add inventory.");
    }
  };
  
  const handleAddSupplier = async () => {
    try {
      await axios.post("https://localhost:7085/api/Supplier", newSupplier); // API call to add supplier
      fetchSuppliers(); // Refresh the suppliers list
      setNewSupplier(null); // Close the modal
      showNotification("Supplier added successfully!");
    } catch (error) {
      console.error("Error adding supplier:", error);
      showNotification("Failed to add supplier.");
    }
  };
  const handleAddStaff = async () => {
    console.log("New Staff Data:", newStaff); // Debugging
    try {
      await axios.post("https://localhost:7085/api/Staff", newStaff);
      fetchStaff();
      setNewStaff(null);
      showNotification("Staff member added successfully!");
    } catch (error) {
      console.error("Error adding staff:", error);
      showNotification("Failed to add staff.");
    }
  };
  
  const handleUpdateStaff = async () => {
    try {
      await axios.put(`https://localhost:7085/api/Staff/${editStaff.staffID}`, editStaff);
      fetchStaff();
      setEditStaff(null);
      showNotification("Staff member updated successfully!");
    } catch (error) {
      console.error("Error updating staff:", error);
      showNotification("Failed to update staff.");
    }
  };
  const handleDeleteStaff = async (id) => {
    try {
      await axios.delete(`https://localhost:7085/api/Staff/${id}`);
      fetchStaff();
      showNotification("Staff member deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      showNotification("Failed to delete staff.");
    }
  };
      
  
  const handleEditSupplier = (supplier) => {
    setEditSupplier(supplier); // Open edit modal with selected supplier
  };

  const handleDeleteSupplier = async (supplierID) => {
    try {
      await axios.delete(`https://localhost:7085/api/Supplier/${supplierID}`); // API call to delete
      fetchSuppliers(); // Refresh suppliers list
      showNotification("Supplier deleted successfully!");
    } catch (error) {
      console.error("Error deleting supplier:", error);
      showNotification("Failed to delete supplier.");
    }
  };
const handleAddSchedule = async () => {
  try {
    const scheduleData = {
      scheduleID: newSchedule.scheduleID,
      staffID: parseInt(newSchedule.staffID, 10), // Ensure it's an integer
      date: newSchedule.date, // Ensure ISO 8601 format
      startTime: `${newSchedule.startTime}:00`, // Ensure HH:mm:ss format
      endTime: `${newSchedule.endTime}:00`, // Ensure HH:mm:ss format
    };

    const response = await axios.post(
      "https://localhost:7085/api/EmployeeSchedule",
      scheduleData
    );

    console.log("Server Response:", response.data);
    fetchSchedules(); // Refresh the schedule list
    setNewSchedule(null); // Close the modal
    showNotification("Schedule added successfully!");
  } catch (error) {
    if (error.response) {
      console.error("Error adding schedule:", error.response.data); // Log server response
    } else {
      console.error("Error adding schedule:", error.message); // Log error message
    }
    showNotification("Failed to add schedule. Check console for details.");
  }
};






const handleUpdateSchedule = async () => {
  try {
    await axios.put(
      `https://localhost:7085/api/EmployeeSchedule/${editSchedule.scheduleID}`,
      editSchedule
    );
    fetchEmployeeSchedules();
    setEditSchedule(null);
    showNotification("Employee schedule updated successfully!");
  } catch (error) {
    console.error("Error updating employee schedule:", error);
    showNotification("Failed to update employee schedule.");
  }
};

const handleDeleteSchedule = async (id) => {
  try {
    await axios.delete(`https://localhost:7085/api/EmployeeSchedule/${id}`);
    fetchEmployeeSchedules();
    showNotification("Employee schedule deleted successfully!");
  } catch (error) {
    console.error("Error deleting employee schedule:", error);
    showNotification("Failed to delete employee schedule.");
  }
};

const handleDeleteGuest = async (id) => {
  try {
    const response = await axios.delete(`https://localhost:7085/api/Guest/${id}`);
    console.log("Server Response:", response);
    if (response.status === 200 || response.status === 204) {
      fetchGuests(); // Refresh the guests list
      showNotification("Guest deleted successfully!", "success");
    } else {
      throw new Error("Failed to delete guest.");
    }
  } catch (error) {
    if (error.response) {
      // Log the server response for debugging
      console.error("Error deleting guest:", error.response.data);
    } else {
      console.error("Error deleting guest:", error.message);
    }
    showNotification("Error deleting guest. Please try again.", "danger");
  }
};


const handleShowSupplierModal = () => {
  fetchSuppliers(); // Ensure suppliers are fetched when opening the modal
  setShowSupplierModal(true); // Open the modal
};

const getNextSupplierID = () => {
  return suppliers.length > 0
    ? Math.max(...suppliers.map((supplier) => supplier.supplierID)) + 1
    : 1; // Default to 1 if no suppliers exist
};


  const handleUpdateGuest = async () => {
    try {
      await axios.put(`https://localhost:7085/api/Guest/${editGuest.guestID}`, editGuest);
      fetchGuests();
      setEditGuest(null);
      showNotification("Guest updated successfully!");
    } catch (error) {
      console.error("Error updating guest:", error);
    }
  };

  const handleDeleteInventory = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7085/api/Inventory/${id}`);
      if (response.status === 200 || response.status === 204) {
        fetchInventory(); // Refresh inventory list
        showNotification("Inventory item deleted successfully!", "danger");
      } else {
        throw new Error("Failed to delete inventory item.");
      }
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      showNotification("Error deleting inventory item. Please try again.", "danger");
    }
  };
  
  const handleEditInventory = (item) => {
    setEditInventory(item); // Pass the item as-is
  };
  
  
const handleUpdateInventory = async () => {
    try {
      await axios.put(
        `https://localhost:7085/api/Inventory/${editInventory.inventoryID}`,
        editInventory // Use editInventory directly
      );
      fetchInventory();
      setEditInventory(null);
      showNotification("Inventory item updated successfully!");
    } catch (error) {
      console.error("Error updating inventory item:", error);
    }
  };
  
  
  
  
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };
  const renderReservationsContent = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
  
    const sortedReservations = [...reservations].sort(
      (a, b) => new Date(a.checkInDate) - new Date(b.checkInDate)
    );
  
    return (
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h3 className="m-0">Reservations</h3>
          <button
            className="btn btn-light text-primary"
            onClick={() =>
              setNewReservation({
                reservationID: 0, // Auto-increment
                guestID: "",
                hotelID: "",
                roomID: "",
                checkInDate: "",
                checkOutDate: "",
                totalPrice: 0,
                paymentStatus: "Pending", // Default to Pending
                invoiceID: null, // No payment yet
              })
            }
          >
            Add Reservation
          </button>
        </div>
  
        {notification && (
          <div className="alert alert-success text-center fade show">
            <strong>{notification}</strong>
          </div>
        )}
  
        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
              <tr>
                <th>Reservation ID</th>
                <th>Guest ID</th>
                <th>Hotel ID</th>
                <th>Room ID</th>
                <th>Check-In Date</th>
                <th>Check-Out Date</th>
                <th>Total Price (€)</th>
                <th>Days Until Check-In</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.length > 0 ? (
                sortedReservations.map((reservation) => {
                  const checkInDate = new Date(reservation.checkInDate);
                  checkInDate.setHours(0, 0, 0, 0);
                  
                  // Calculate days until check-in
                  const daysUntilCheckIn = Math.ceil(
                    (checkInDate - today) / (1000 * 60 * 60 * 24)
                  );
  
                  let rowStyle = {};
                  let statusText = `${daysUntilCheckIn} days left`;
  
                  if (daysUntilCheckIn === 0) {
                    rowStyle = { backgroundColor: "#28a745", color: "#fff", fontWeight: "bold" };
                    statusText = "Happening Today";
                  } else if (daysUntilCheckIn < 0) {
                    rowStyle = { backgroundColor: "#ff4d4f", color: "#fff", fontWeight: "bold" };
                    statusText = "Expired";
                  }
  
                  return (
                    <tr key={reservation.reservationID} style={rowStyle}>
                      <td>{reservation.reservationID}</td>
                      <td>{reservation.guestID}</td>
                      <td>{reservation.hotelID}</td>
                      <td>{reservation.roomID}</td>
                      <td>{reservation.checkInDate.split("T")[0]}</td>
                      <td>{reservation.checkOutDate.split("T")[0]}</td>
                      <td>€{reservation.totalPrice.toFixed(2)}</td>
                      <td>{statusText}</td>
                      <td>
                        <span
                          className={`badge ${
                            reservation.paymentStatus === "Paid"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {reservation.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => setEditReservation(reservation)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() =>
                            handleDeleteReservation(reservation.reservationID)
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-muted">
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  
  const renderGymsContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Gyms</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewGym({
              AmenityID: "",
              NumberOfMachines: "",
              Open24Hours: false,
            })
          }
        >
          Add New Gym
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Gym ID</th>
              <th>Amenity ID</th>
              <th>Number of Machines</th>
              <th>Open 24 Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gyms.length > 0 ? (
              gyms.map((gym) => (
                <tr key={gym.GymID}>
                  <td>{gym.GymID}</td>
                  <td>{gym.AmenityID}</td>
                  <td>{gym.NumberOfMachines}</td>
                  <td>{gym.Open24Hours ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditGym(gym)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteGym(gym.GymID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No gyms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Gym Modal */}
      {editGym && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Gym</h5>
                <button type="button" className="btn-close" onClick={() => setEditGym(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Gym ID"
                  value={editGym.GymID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={editGym.AmenityID}
                  onChange={(e) => setEditGym({ ...editGym, AmenityID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Number of Machines"
                  value={editGym.NumberOfMachines}
                  onChange={(e) => setEditGym({ ...editGym, NumberOfMachines: e.target.value })}
                />
                <select
                  className="form-control mb-3"
                  value={editGym.Open24Hours ? "true" : "false"}
                  onChange={(e) => setEditGym({ ...editGym, Open24Hours: e.target.value === "true" })}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateGym}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditGym(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Gym Modal */}
      {newGym && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Gym</h5>
                <button type="button" className="btn-close" onClick={() => setNewGym(null)}></button>
              </div>
              <div className="modal-body">
                {/* Removed Gym ID field since it's auto-incremented */}
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={newGym.AmenityID}
                  onChange={(e) => setNewGym({ ...newGym, AmenityID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Number of Machines"
                  value={newGym.NumberOfMachines}
                  onChange={(e) => setNewGym({ ...newGym, NumberOfMachines: e.target.value })}
                />
                <select
                  className="form-control mb-3"
                  value={newGym.Open24Hours ? "true" : "false"}
                  onChange={(e) => setNewGym({ ...newGym, Open24Hours: e.target.value === "true" })}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddGym}>
                  Add
                </button>
                <button className="btn btn-secondary" onClick={() => setNewGym(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );


  const renderSaunasContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Saunas</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewSauna({
              SaunaID: 0, // Auto-incremented by the database
              AmenityID: "",
              MaxTemperature: "",
              Capacity: "",
            })
          }
        >
          Add New Sauna
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Sauna ID</th>
              <th>Amenity ID</th>
              <th>Max Temperature</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {saunas.length > 0 ? (
              saunas.map((sauna) => (
                <tr key={sauna.SaunaID}>
                  <td>{sauna.SaunaID}</td>
                  <td>{sauna.AmenityID}</td>
                  <td>{sauna.MaxTemperature}</td>
                  <td>{sauna.Capacity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditSauna(sauna)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteSauna(sauna.SaunaID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No saunas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Sauna Modal */}
      {editSauna && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Sauna</h5>
                <button type="button" className="btn-close" onClick={() => setEditSauna(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Sauna ID"
                  value={editSauna.SaunaID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={editSauna.AmenityID}
                  onChange={(e) => setEditSauna({ ...editSauna, AmenityID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Max Temperature"
                  value={editSauna.MaxTemperature}
                  onChange={(e) => setEditSauna({ ...editSauna, MaxTemperature: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Capacity"
                  value={editSauna.Capacity}
                  onChange={(e) => setEditSauna({ ...editSauna, Capacity: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateSauna}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditSauna(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Sauna Modal */}
      {newSauna && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Sauna</h5>
                <button type="button" className="btn-close" onClick={() => setNewSauna(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={newSauna.AmenityID}
                  onChange={(e) => setNewSauna({ ...newSauna, AmenityID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Max Temperature"
                  value={newSauna.MaxTemperature}
                  onChange={(e) => setNewSauna({ ...newSauna, MaxTemperature: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Capacity"
                  value={newSauna.Capacity}
                  onChange={(e) => setNewSauna({ ...newSauna, Capacity: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddSauna}>
                  Add
                </button>
                <button className="btn btn-secondary" onClick={() => setNewSauna(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  const renderSpasContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Spas</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewSpa({
              SpaID: 0, // Auto-incremented by the database
              AmenityID: "",
              NumberOfRooms: "",
              OpeningTime: "09:00", // Default opening time
              ClosingTime: "18:00", // Default closing time
            })
          }
        >
          Add New Spa
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Spa ID</th>
              <th>Amenity ID</th>
              <th>Number of Rooms</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spas.length > 0 ? (
              spas.map((spa) => (
                <tr key={spa.SpaID}>
                  <td>{spa.SpaID}</td>
                  <td>{spa.AmenityID}</td>
                  <td>{spa.NumberOfRooms}</td>
                  <td>{spa.OpeningTime}</td>
                  <td>{spa.ClosingTime}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditSpa(spa)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteSpa(spa.SpaID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No spas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Spa Modal */}
      {editSpa && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Spa</h5>
                <button type="button" className="btn-close" onClick={() => setEditSpa(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Spa ID"
                  value={editSpa.SpaID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={editSpa.AmenityID}
                  onChange={(e) => setEditSpa({ ...editSpa, AmenityID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Number of Rooms"
                  value={editSpa.NumberOfRooms}
                  onChange={(e) => setEditSpa({ ...editSpa, NumberOfRooms: e.target.value })}
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="Opening Time"
                  value={editSpa.OpeningTime}
                  onChange={(e) => setEditSpa({ ...editSpa, OpeningTime: e.target.value })}
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="Closing Time"
                  value={editSpa.ClosingTime}
                  onChange={(e) => setEditSpa({ ...editSpa, ClosingTime: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateSpa}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditSpa(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Spa Modal */}
      {newSpa && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Spa</h5>
                <button type="button" className="btn-close" onClick={() => setNewSpa(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={newSpa.AmenityID}
                  onChange={(e) => setNewSpa({ ...newSpa, AmenityID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Number of Rooms"
                  value={newSpa.NumberOfRooms}
                  onChange={(e) => setNewSpa({ ...newSpa, NumberOfRooms: e.target.value })}
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="Opening Time"
                  value={newSpa.OpeningTime}
                  onChange={(e) => setNewSpa({ ...newSpa, OpeningTime: e.target.value })}
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="Closing Time"
                  value={newSpa.ClosingTime}
                  onChange={(e) => setNewSpa({ ...newSpa, ClosingTime: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddSpa}>
                  Add
                </button>
                <button className="btn btn-secondary" onClick={() => setNewSpa(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );


  const renderAmenitiesContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Amenities</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewAmenity({
              amenityID: amenities.length > 0
                ? Math.max(...amenities.map((a) => a.amenityID)) + 1
                : 1,
              name: "",
              description: "",
            })
          }
        >
          Add New Amenity
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Amenity ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {amenities.length > 0 ? (
              amenities.map((amenity) => (
                <tr key={amenity.amenityID}>
                  <td>{amenity.amenityID}</td>
                  <td>{amenity.name}</td>
                  <td>{amenity.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditAmenity(amenity)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteAmenity(amenity.amenityID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No amenities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Amenity Modal */}
      {editAmenity && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Amenity</h5>
                <button type="button" className="btn-close" onClick={() => setEditAmenity(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={editAmenity.amenityID}
                  readOnly
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Name"
                  value={editAmenity.name}
                  onChange={(e) => setEditAmenity({ ...editAmenity, name: e.target.value })}
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Description"
                  value={editAmenity.description}
                  onChange={(e) => setEditAmenity({ ...editAmenity, description: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateAmenity}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditAmenity(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Amenity Modal */}
      {newAmenity && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Amenity</h5>
                <button type="button" className="btn-close" onClick={() => setNewAmenity(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Amenity ID"
                  value={newAmenity.amenityID}
                  readOnly
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Name"
                  value={newAmenity.name}
                  onChange={(e) => setNewAmenity({ ...newAmenity, name: e.target.value })}
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Description"
                  value={newAmenity.description}
                  onChange={(e) => setNewAmenity({ ...newAmenity, description: e.target.value })}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddAmenity}>
                  Add
                </button>
                <button className="btn btn-secondary" onClick={() => setNewAmenity(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
  
  const renderRoomsContent = () => {
    const paginatedRooms = rooms.slice(
      currentPage * rowsPerPage,
      (currentPage + 1) * rowsPerPage
    );
  
    return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Rooms</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewRoom({
              roomID: rooms.length > 0 ? Math.max(...rooms.map((r) => r.roomID)) + 1 : 1,
              hotelID: "",
              roomNumber: "",
              roomTypeID: "",
              occupiedByGuestID: null, // Default to null
            })
          }
        >
          Add New Room
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Room ID</th>
              <th>Hotel ID</th>
              <th>Room Number</th>
              <th>Room Type ID</th>
              <th>Status</th>
              <th>Occupied By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRooms.length > 0 ? (
              paginatedRooms.map((room) => (
                <tr key={room.roomID}>
                  <td>{room.roomID}</td>
                  <td>{room.hotelID}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomTypeID}</td>
                  <td
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    backgroundColor: room.occupiedByGuestID ? "#ff4d4f" : "#52c41a", // Red for Unavailable, Green for Available
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    borderRadius: "25px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Modern shadow for depth
    width: "150px",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default",
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = "scale(1.05)";
    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  }}
>
  {room.occupiedByGuestID ? "Unavailable" : "Available"}
</td>


                  <td>
                    {room.occupiedByGuestID ? (
                      <div>
                        <strong>Name:</strong> {room.occupiedByGuest?.firstName}{" "}
                        {room.occupiedByGuest?.lastName}
                        <br />
                        <strong>Email:</strong> {room.occupiedByGuest?.email}
                        <br />
                        <strong>Phone:</strong> {room.occupiedByGuest?.phone}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditRoom(room)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteRoom(room.roomID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <button
  className="btn btn-primary me-2"
  onClick={() => setCurrentPage((prev) => prev - 1)}
  disabled={currentPage === 0}
>
  Previous
</button>
<button
  className="btn btn-primary"
  onClick={() => setCurrentPage((prev) => prev + 1)}
  disabled={(currentPage + 1) * rowsPerPage >= rooms.length}
>
  Next
</button>

        
      </div>
  
      {/* Edit Room Modal */}
      {editRoom && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Room</h5>
                <button type="button" className="btn-close" onClick={() => setEditRoom(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Hotel ID"
                  value={editRoom.hotelID}
                  onChange={(e) => setEditRoom({ ...editRoom, hotelID: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Room Number"
                  value={editRoom.roomNumber}
                  onChange={(e) => setEditRoom({ ...editRoom, roomNumber: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Room Type ID (1-3)"
                  value={editRoom.roomTypeID}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value >= 1 && value <= 3) {
                      setEditRoom({ ...editRoom, roomTypeID: value });
                    }
                  }}
                />
                <select
                  className="form-control mb-3"
                  value={editRoom.occupiedByGuestID || ""}
                  onChange={(e) =>
                    setEditRoom({
                      ...editRoom,
                      occupiedByGuestID: e.target.value ? parseInt(e.target.value, 10) : null,
                    })
                  }
                >
                  <option value="">Available</option>
                  {guests.map((guest) => (
                    <option key={guest.guestID} value={guest.guestID}>
                      {guest.firstName} {guest.lastName} ({guest.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateRoom}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditRoom(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Room Modal */}
      {newRoom && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Room</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setNewRoom(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Room ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newRoom.roomID}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Hotel ID</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newRoom.hotelID}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, hotelID: parseInt(e.target.value, 10) || "" })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Room Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newRoom.roomNumber}
                    onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Room Type ID (1-3)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newRoom.roomTypeID}
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, roomTypeID: parseInt(e.target.value, 10) || "" })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Occupied By Guest</label>
                  <select
                    className="form-control"
                    value={newRoom.occupiedByGuestID || ""}
                    onChange={(e) =>
                      setNewRoom({
                        ...newRoom,
                        occupiedByGuestID: e.target.value ? parseInt(e.target.value, 10) : null,
                      })
                    }
                  >
                    <option value="">Available</option>
                    {guests.map((guest) => (
                      <option key={guest.guestID} value={guest.guestID}>
                        {guest.firstName} {guest.lastName} ({guest.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddRoom}>
                  Add
                </button>
                <button className="btn btn-secondary" onClick={() => setNewRoom(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};
  
  
  
  const renderStaffContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Staff</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewStaff({
              staffID: staff.length > 0 ? Math.max(...staff.map((s) => s.staffID)) + 1 : 1,
              firstName: "",
              lastName: "",
              position: "",
              email: "",
              phone: "",
              hotelID: "",
            })
          }
        >
          Add New Staff
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hotel ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length > 0 ? (
              staff.map((member) => (
                <tr key={member.staffID}>
                  <td>{member.staffID}</td>
                  <td>{member.firstName}</td>
                  <td>{member.lastName}</td>
                  <td>{member.position}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.hotelID}</td>
                  <td>
  <button
    className="btn btn-sm btn-primary me-2"
    title="Edit Staff"
    onClick={() => setEditStaff(member)} // Opens the Edit modal
  >
    <FaEdit />
  </button>
  <button
    className="btn btn-sm btn-danger"
    title="Delete Staff"
    onClick={() => handleDeleteStaff(member.staffID)} // Deletes the staff member
  >
    <FaTrashAlt />
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Staff Modal */}
      {editStaff && (
  <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Staff Member</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setEditStaff(null)}
          ></button>
        </div>
        <div className="modal-body">
          {/* Read-only ID Field */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Staff ID"
            value={editStaff.staffID} // Read-only value
            readOnly
          />
          {/* Other fields */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="First Name"
            value={editStaff.firstName}
            onChange={(e) => setEditStaff({ ...editStaff, firstName: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Last Name"
            value={editStaff.lastName}
            onChange={(e) => setEditStaff({ ...editStaff, lastName: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Position"
            value={editStaff.position}
            onChange={(e) => setEditStaff({ ...editStaff, position: e.target.value })}
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={editStaff.email}
            onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone"
            value={editStaff.phone}
            onChange={(e) => setEditStaff({ ...editStaff, phone: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Hotel ID"
            value={editStaff.hotelID}
            onChange={(e) => setEditStaff({ ...editStaff, hotelID: e.target.value })}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleUpdateStaff}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEditStaff(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

  
      {/* Add New Staff Modal */}
      {newStaff && (
  <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Staff Member</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setNewStaff(null)}
          ></button>
        </div>
        <div className="modal-body">
          {/* Read-only ID Field */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Staff ID"
            value={newStaff.staffID} // Read-only value
            readOnly
          />
          {/* Other fields */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="First Name"
            value={newStaff.firstName}
            onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Last Name"
            value={newStaff.lastName}
            onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Position"
            value={newStaff.position}
            onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={newStaff.email}
            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone"
            value={newStaff.phone}
            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
          />
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Hotel ID"
            value={newStaff.hotelID}
            onChange={(e) => setNewStaff({ ...newStaff, hotelID: e.target.value })}
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleAddStaff}>
            Add
          </button>
          <button className="btn btn-secondary" onClick={() => setNewStaff(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
  const renderEmployeeScheduleContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Employee Schedules</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewSchedule({
              scheduleID: employeeSchedules.length > 0
                ? Math.max(...employeeSchedules.map((s) => s.scheduleID)) + 1
                : 1,
              staffID: "",
              date: "",
              startTime: "",
              endTime: "",
            })
          }
        >
          Add New Schedule
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Schedule ID</th>
              <th>Staff ID</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeSchedules.length > 0 ? (
              employeeSchedules.map((schedule) => (
                <tr key={schedule.scheduleID}>
                  <td>{schedule.scheduleID}</td>
                  <td>{schedule.staffID}</td>
                  <td>{schedule.date}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                  <td>
  <button
    className="btn btn-sm btn-primary me-2"
    title="Edit Schedule"
    onClick={() => setEditSchedule(schedule)} // Opens the Edit modal
  >
    <FaEdit />
  </button>
  <button
    className="btn btn-sm btn-danger"
    title="Delete Schedule"
    onClick={() => handleDeleteSchedule(schedule.scheduleID)} // Deletes the schedule
  >
    <FaTrashAlt />
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No employee schedules found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Modal */}
      {editSchedule && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee Schedule</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditSchedule(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Schedule ID"
                  value={editSchedule.scheduleID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Staff ID"
                  value={editSchedule.staffID}
                  onChange={(e) =>
                    setEditSchedule({ ...editSchedule, staffID: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="Date"
                  value={editSchedule.date}
                  onChange={(e) =>
                    setEditSchedule({ ...editSchedule, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="Start Time"
                  value={editSchedule.startTime}
                  onChange={(e) =>
                    setEditSchedule({ ...editSchedule, startTime: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="End Time"
                  value={editSchedule.endTime}
                  onChange={(e) =>
                    setEditSchedule({ ...editSchedule, endTime: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateSchedule}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditSchedule(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add Modal */}
      {newSchedule && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Employee Schedule</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setNewSchedule(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Schedule ID"
                  value={newSchedule.scheduleID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Staff ID"
                  value={newSchedule.staffID}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, staffID: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="Date"
                  value={newSchedule.date}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="Start Time"
                  value={newSchedule.startTime}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, startTime: e.target.value })
                  }
                />
                <input
                  type="time"
                  className="form-control mb-3"
                  placeholder="End Time"
                  value={newSchedule.endTime}
                  onChange={(e) =>
                    setNewSchedule({ ...newSchedule, endTime: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleAddSchedule}>
                  Add
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setNewSchedule(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  const renderMaintenanceRequestsContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Maintenance Requests</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() =>
            setNewMaintenanceRequest({
              requestID: maintenanceRequests.length > 0
                ? Math.max(...maintenanceRequests.map((r) => r.requestID)) + 1
                : 1,
              hotelID: "",
              description: "",
              requestDate: "",
              priority: "",
              status: "",
            })
          }
        >
          Add New Request
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Request ID</th>
              <th>Hotel ID</th>
              <th>Description</th>
              <th>Request Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRequests.length > 0 ? (
              maintenanceRequests.map((request) => (
                <tr key={request.requestID}>
                  <td>{request.requestID}</td>
                  <td>{request.hotelID}</td>
                  <td>{request.description}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.priority}</td>
                  <td>{request.status}</td>
                  <td>
  <button
    className="btn btn-sm btn-primary me-2"
    title="Edit Request"
    onClick={() => setEditMaintenanceRequest(request)} // Opens the Edit modal
  >
    <FaEdit />
  </button>
  <button
    className="btn btn-sm btn-danger"
    title="Delete Request"
    onClick={() => handleDeleteMaintenanceRequest(request.requestID)} // Deletes the request
  >
    <FaTrashAlt />
  </button>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No maintenance requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Maintenance Request Modal */}
      {editMaintenanceRequest && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Maintenance Request</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditMaintenanceRequest(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Hotel ID"
                  value={editMaintenanceRequest.hotelID || ""}
                  onChange={(e) =>
                    setEditMaintenanceRequest({
                      ...editMaintenanceRequest,
                      hotelID: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Description"
                  value={editMaintenanceRequest.description || ""}
                  onChange={(e) =>
                    setEditMaintenanceRequest({
                      ...editMaintenanceRequest,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="Request Date"
                  value={editMaintenanceRequest.requestDate || ""}
                  onChange={(e) =>
                    setEditMaintenanceRequest({
                      ...editMaintenanceRequest,
                      requestDate: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Priority"
                  value={editMaintenanceRequest.priority || ""}
                  onChange={(e) =>
                    setEditMaintenanceRequest({
                      ...editMaintenanceRequest,
                      priority: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Status"
                  value={editMaintenanceRequest.status || ""}
                  onChange={(e) =>
                    setEditMaintenanceRequest({
                      ...editMaintenanceRequest,
                      status: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateMaintenanceRequest}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMaintenanceRequest(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add New Maintenance Request Modal */}
      {newMaintenanceRequest && (
  <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Maintenance Request</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setNewMaintenanceRequest(null)}
          ></button>
        </div>
        <div className="modal-body">
          {/* Request ID - Read-Only */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Request ID"
            value={
              newMaintenanceRequest.requestID ||
              (maintenanceRequests.length > 0
                ? Math.max(...maintenanceRequests.map((r) => r.requestID)) + 1
                : 1)
            }
            readOnly
          />

          {/* Hotel ID */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Hotel ID"
            value={newMaintenanceRequest.hotelID || ""}
            onChange={(e) =>
              setNewMaintenanceRequest({
                ...newMaintenanceRequest,
                hotelID: e.target.value,
              })
            }
          />

          {/* Description */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Description"
            value={newMaintenanceRequest.description || ""}
            onChange={(e) =>
              setNewMaintenanceRequest({
                ...newMaintenanceRequest,
                description: e.target.value,
              })
            }
          />

          {/* Request Date */}
          <input
            type="date"
            className="form-control mb-3"
            placeholder="Request Date"
            value={newMaintenanceRequest.requestDate || ""}
            onChange={(e) =>
              setNewMaintenanceRequest({
                ...newMaintenanceRequest,
                requestDate: e.target.value,
              })
            }
          />

          {/* Priority */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Priority"
            value={newMaintenanceRequest.priority || ""}
            onChange={(e) =>
              setNewMaintenanceRequest({
                ...newMaintenanceRequest,
                priority: e.target.value,
              })
            }
          />

          {/* Status */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Status"
            value={newMaintenanceRequest.status || ""}
            onChange={(e) =>
              setNewMaintenanceRequest({
                ...newMaintenanceRequest,
                status: e.target.value,
              })
            }
          />
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleAddMaintenanceRequest}>
            Add
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setNewMaintenanceRequest(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
  
  

  const renderInventoryContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between">
        <h3 className="m-0">Inventory</h3>
        <button
          className="btn btn-light text-primary"
          onClick={() => {
            const nextInventoryID =
              inventory.length > 0
                ? Math.max(...inventory.map((item) => item.inventoryID)) + 1
                : 1;
  
            setNewInventory({
              inventoryID: nextInventoryID,
              hotelID: "",
              itemName: "",
              quantity: "",
              price: "",
              supplierID: "",
            });
          }}
        >
          Add New Inventory
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>ID</th>
              <th>Hotel ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>
                Supplier ID
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={handleShowSupplierModal}
                >
                  &#x25BC;
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.inventoryID}>
                  <td>{item.inventoryID}</td>
                  <td>{item.hotelID || "N/A"}</td>
                  <td>{item.itemName || "N/A"}</td>
                  <td>{item.quantity || "N/A"}</td>
                  <td>{item.price || "N/A"}</td>
                  <td>{item.supplierID || "N/A"}</td>
                  <td>
  <button
    className="btn btn-sm btn-primary me-2"
    title="Edit Inventory"
    onClick={() => setEditInventory(item)} // Opens the Edit modal
  >
    <FaEdit />
  </button>
  <button
    className="btn btn-sm btn-danger"
    title="Delete Inventory"
    onClick={() => handleDeleteInventory(item.inventoryID)} // Deletes the inventory item
  >
    <FaTrashAlt />
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No inventory items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Inventory Modal */}
      {editInventory && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Inventory Item</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditInventory(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Hotel ID"
                  value={editInventory.hotelID || ""}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      hotelID: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Item Name"
                  value={editInventory.itemName || ""}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      itemName: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Quantity"
                  value={editInventory.quantity || ""}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      quantity: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Price"
                  value={editInventory.price || ""}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      price: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Supplier ID"
                  value={editInventory.supplierID || ""}
                  onChange={(e) =>
                    setEditInventory({
                      ...editInventory,
                      supplierID: e.target.value,
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateInventory}
                >
                  Update
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditInventory(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Add New Inventory Modal */}
      {newInventory && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Inventory</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setNewInventory(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Inventory ID"
                  value={newInventory.inventoryID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Hotel ID"
                  value={newInventory.hotelID}
                  onChange={(e) =>
                    setNewInventory({
                      ...newInventory,
                      hotelID: parseInt(e.target.value, 10),
                    })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Item Name"
                  value={newInventory.itemName}
                  onChange={(e) =>
                    setNewInventory({
                      ...newInventory,
                      itemName: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Quantity"
                  value={newInventory.quantity}
                  onChange={(e) =>
                    setNewInventory({
                      ...newInventory,
                      quantity: parseInt(e.target.value, 10),
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Price"
                  value={newInventory.price}
                  onChange={(e) =>
                    setNewInventory({
                      ...newInventory,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Supplier ID"
                  value={newInventory.supplierID || ""}
                  onChange={(e) =>
                    setNewInventory({
                      ...newInventory,
                      supplierID: parseInt(e.target.value, 10),
                    })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleAddInventory}
                >
                  Add
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setNewInventory(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
  
      {/* Supplier Modal */}
    {/* Supplier Modal */}
{/* Supplier Modal */}
{/* Supplier Modal */}
{showSupplierModal && (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <div
      className="modal-dialog"
      style={{
        maxWidth: "80%", // Adjust modal width
        width: "80%",
        maxHeight: "90vh", // Ensure the modal doesn't exceed viewport height
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Suppliers</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowSupplierModal(false)}
          ></button>
        </div>
        <div
          className="modal-body"
          style={{
            overflowY: "auto", // Add scroll if content exceeds height
          }}
        >
       <button
  className="btn btn-primary mb-3"
  onClick={() =>
    setNewSupplier({
      supplierID: getNextSupplierID(), // Automatically calculate the next ID
      name: "",
      contactName: "",
      phone: "",
      email: "",
    })
  }
>
  Add New Supplier
</button>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Name</th>
                <th>Contact Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.supplierID}>
                  <td>{supplier.supplierID}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.contactName}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.email}</td>
                  <td>
  <button
    className="btn btn-sm btn-primary me-2"
    title="Edit Supplier"
    onClick={() => handleEditSupplier(supplier)} // Opens the Edit modal
  >
    <FaEdit />
  </button>
  <button
    className="btn btn-sm btn-danger"
    title="Delete Supplier"
    onClick={() => handleDeleteSupplier(supplier.supplierID)} // Deletes the supplier
  >
    <FaTrashAlt />
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)}
{/* Add Supplier Modal */}
{/* Add Supplier Modal */}
{newSupplier && (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Supplier</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setNewSupplier(null)}
          ></button>
        </div>
        <div className="modal-body">
          {/* Supplier ID Field */}
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Supplier ID"
            value={newSupplier.supplierID} // Read-only value
            readOnly
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={newSupplier.name}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, name: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Contact Name"
            value={newSupplier.contactName}
            onChange={(e) =>
              setNewSupplier({
                ...newSupplier,
                contactName: e.target.value,
              })
            }
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone"
            value={newSupplier.phone}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, phone: e.target.value })
            }
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={newSupplier.email}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, email: e.target.value })
            }
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={handleAddSupplier}
          >
            Add
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setNewSupplier(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


{/* Edit Supplier Modal */}
{editSupplier && (
  <div
    className="modal d-block"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Supplier</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setEditSupplier(null)} // Close modal
          ></button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={editSupplier.name}
            onChange={(e) =>
              setEditSupplier({ ...editSupplier, name: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Contact Name"
            value={editSupplier.contactName}
            onChange={(e) =>
              setEditSupplier({ ...editSupplier, contactName: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone"
            value={editSupplier.phone}
            onChange={(e) =>
              setEditSupplier({ ...editSupplier, phone: e.target.value })
            }
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={editSupplier.email}
            onChange={(e) =>
              setEditSupplier({ ...editSupplier, email: e.target.value })
            }
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={async () => {
              try {
                await axios.put(
                  `https://localhost:7085/api/Supplier/${editSupplier.supplierID}`,
                  editSupplier
                ); // API call to update
                fetchSuppliers(); // Refresh suppliers list
                setEditSupplier(null); // Close modal
                showNotification("Supplier updated successfully!");
              } catch (error) {
                console.error("Error updating supplier:", error);
                showNotification("Failed to update supplier.");
              }
            }}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setEditSupplier(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
  
  const renderReviewsContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h3 className="m-0">Reviews</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>Review ID</th>
              <th>Hotel ID</th>
              <th>Guest ID</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Review Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.reviewID}>
                  <td>{review.reviewID}</td>
                  <td>{review.hotelID}</td>
                  <td>{review.guestID}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                  <td>{review.reviewDate}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => setEditReview(review)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteReview(review.reviewID)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Review Modal */}
      {editReview && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Review</h5>
                <button type="button" className="btn-close" onClick={() => setEditReview(null)}></button>
              </div>
              <div className="modal-body">
                {/* Review ID (Read-Only) */}
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Review ID"
                  value={editReview.reviewID}
                  readOnly
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Hotel ID"
                  value={editReview.hotelID}
                  onChange={(e) => setEditReview({ ...editReview, hotelID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Guest ID"
                  value={editReview.guestID}
                  onChange={(e) => setEditReview({ ...editReview, guestID: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mb-3"
                  placeholder="Rating"
                  value={editReview.rating}
                  onChange={(e) => setEditReview({ ...editReview, rating: e.target.value })}
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Comment"
                  value={editReview.comment}
                  onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
                />
                <input
                  type="date"
                  className="form-control mb-3"
                  placeholder="Review Date"
                  value={editReview.reviewDate}
                  onChange={(e) => setEditReview({ ...editReview, reviewDate: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateReview}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditReview(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  

  
  const renderGuestsContent = () => (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h3 className="m-0">Guests</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.length > 0 ? (
              guests.map((guest, index) => (
                <tr key={guest.guestID || index}>
                  <td>{guest.guestID}</td>
                  <td>{guest.firstName || "N/A"}</td>
                  <td>{guest.lastName || "N/A"}</td>
                  <td>{guest.email || "N/A"}</td>
                  <td>{guest.phone || "N/A"}</td>
                  <td>
  <button
    className="btn btn-sm btn-primary me-2"
    title="Edit Guest"
    onClick={() => setEditGuest(guest)} // Opens the Edit modal
  >
    <FaEdit />
  </button>
  <button
    className="btn btn-sm btn-danger"
    title="Delete Guest"
    onClick={() => handleDeleteGuest(guest.guestID)} // Deletes the guest
  >
    <FaTrashAlt />
  </button>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No guests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Edit Guest Modal */}
      {editGuest && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Guest</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditGuest(null)} // Closes the modal
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="First Name"
                  value={editGuest.firstName}
                  onChange={(e) => setEditGuest({ ...editGuest, firstName: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Last Name"
                  value={editGuest.lastName}
                  onChange={(e) => setEditGuest({ ...editGuest, lastName: e.target.value })}
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={editGuest.email}
                  onChange={(e) => setEditGuest({ ...editGuest, email: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Phone"
                  value={editGuest.phone}
                  onChange={(e) => setEditGuest({ ...editGuest, phone: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateGuest} // Updates the guest
                >
                  Update
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditGuest(null)} // Cancels editing
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
  
  

  return (
    <div style={styles.layout}>
    
<div
  className="bg-dark text-white vh-100 d-flex flex-column"
  style={{
    width: isSidebarCollapsed ? "60px" : "240px",
    transition: "width 0.3s ease",
  }}
>
  <button
    className="btn btn-light m-2 align-self-end"
    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
    style={{
      width: "30px",
      height: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {isSidebarCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
  </button>

  <div
    className="p-3 text-center fw-bold"
    style={{ display: isSidebarCollapsed ? "none" : "block" }}
  >
    Admin Dashboard
  </div>

  <ul className="nav flex-column">
    <li
      className={`nav-item p-2 ${activeTab === "guests" ? "bg-primary text-white" : ""}`}
      onClick={() => setActiveTab("guests")}
    >
      <FaUser className="me-2" />
      {!isSidebarCollapsed && "Guests"}
    </li>
    <li
  className={`nav-item p-2 ${activeTab === "amenities" ? "bg-primary text-white" : ""}`}
  onClick={() => setActiveTab("amenities")}
>
  <FaTools className="me-2" />
  {!isSidebarCollapsed && "Amenities"}
</li>

    <li
      className={`nav-item p-2 ${activeTab === "inventory" ? "bg-primary text-white" : ""}`}
      onClick={() => setActiveTab("inventory")}
    >
      <FaBox className="me-2" />
      {!isSidebarCollapsed && "Inventory"}
    </li>
    <li
      className={`nav-item p-2 ${activeTab === "staff" ? "bg-primary text-white" : ""}`}
      onClick={() => setActiveTab("staff")}
    >
      <FaUsers className="me-2" />
      {!isSidebarCollapsed && "Staff"}
    </li>
    <li
      className={`nav-item p-2 ${activeTab === "maintenanceRequests" ? "bg-primary text-white" : ""}`}
      onClick={() => setActiveTab("maintenanceRequests")}
    >
      <FaTools className="me-2" />
      {!isSidebarCollapsed && "Maintenance Requests"}
    </li>
    <li
      className={`nav-item p-2 ${activeTab === "employeeSchedule" ? "bg-primary text-white" : ""}`}
      onClick={() => setActiveTab("employeeSchedule")}
    >
      <FaCalendarAlt className="me-2" />
      {!isSidebarCollapsed && "Employee Schedules"}
    </li>
    <li
  className={`nav-item p-2 ${activeTab === "rooms" ? "bg-primary text-white" : ""}`}
  onClick={() => setActiveTab("rooms")}
>
  <FaBox className="me-2" />
  {!isSidebarCollapsed && "Rooms"}
</li>
<li
    className={`nav-item p-2 ${activeTab === "reviews" ? "bg-primary text-white" : ""}`}
    onClick={() => setActiveTab("reviews")}
  >
    <FaEdit className="me-2" />
    {!isSidebarCollapsed && "Reviews"}
  </li>
  <li
  className={`nav-item p-2 ${activeTab === "reservations" ? "bg-primary text-white" : ""}`}
  onClick={() => setActiveTab("reservations")}
>
  <FaClipboardList className="me-2" />
  {!isSidebarCollapsed && "Reservations"}
</li>
<li
  className={`nav-item p-2 ${activeTab === "gyms" ? "bg-primary text-white" : ""}`}
  onClick={() => setActiveTab("gyms")}
>
  <FaDumbbell className="me-2" />
  {!isSidebarCollapsed && "Gyms"}
</li>
<li
  className={`nav-item p-2 ${activeTab === "saunas" ? "bg-primary text-white" : ""}`}
  onClick={() => setActiveTab("saunas")}
>
  <FaHotTub className="me-2" /> {/* Use an appropriate icon */}
  {!isSidebarCollapsed && "Saunas"}
</li>
<li
  className={`nav-item p-2 ${activeTab === "spas" ? "bg-primary text-white" : ""}`}
  onClick={() => setActiveTab("spas")}
>
  <FaSpa className="me-2" /> {/* Use an appropriate icon */}
  {!isSidebarCollapsed && "Spas"}
</li>
  </ul>
  {/* Logout Button at the Bottom */}
<button
  className="btn btn-danger w-100 mt-auto"
  style={{
    borderRadius: "0",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "12px 0",
  }}
  onClick={handleLogout}
>
  Log Out
</button>

</div>

      <div style={{ flex: 1 }}>
      <div className="d-flex justify-content-between align-items-center bg-light border-bottom p-3">
  <h1 className="h5 m-0">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
</div>
<div className="container mt-3">
{activeTab === "guests" && renderGuestsContent()}
{activeTab === "inventory" && renderInventoryContent()}
{activeTab === "staff" && renderStaffContent()}
{activeTab === "maintenanceRequests" && renderMaintenanceRequestsContent()}
{activeTab === "employeeSchedule" && renderEmployeeScheduleContent()}
{activeTab === "rooms" && renderRoomsContent()}
{activeTab === "reviews" && renderReviewsContent()}
{activeTab === "amenities" && renderAmenitiesContent()}
{activeTab === "reservations" && renderReservationsContent()}
{activeTab === "gyms" && renderGymsContent()}
{activeTab === "saunas" && renderSaunasContent()}
{activeTab === "spas" && renderSpasContent()}

</div>


      </div>
      
      {editInventory && (
  <div style={styles.modalBackdrop}>
 
  </div>
)}

{notification && (
  <div
    className="alert alert-success position-fixed top-0 end-0 m-3"
    style={{ zIndex: 2000 }}
  >
    <i className="me-2 fa fa-check-circle"></i> {notification}
  </div>
)}
{sessionExpired && (
  <div
    className="alert alert-danger position-fixed top-0 end-0 m-3"
    style={{ zIndex: 2000 }}
  >
    <i className="me-2 fa fa-exclamation-circle"></i> Your session has expired. Redirecting to login...
  </div>
)}


    </div>
  );
};

export default AdminDashboard;
