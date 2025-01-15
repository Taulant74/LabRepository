import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft, FaArrowRight, FaUser, FaBox, FaUsers, FaTools, FaCalendarAlt, FaEdit, FaTrashAlt  } from "react-icons/fa";

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
  </ul>
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


    </div>
  );
};

export default AdminDashboard;
