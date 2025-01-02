import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
    

const handleDeleteGuest = async (id) => {
  try {
    const response = await axios.delete(`https://localhost:7085/api/Guest/${id}`);
    if (response.status === 200 || response.status === 204) {
      fetchGuests(); // Refresh the guests list
      showNotification("Guest deleted successfully!", "danger");
    } else {
      throw new Error("Failed to delete guest.");
    }
  } catch (error) {
    console.error("Error deleting guest:", error);
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
                      onClick={() => setEditInventory(item)} // Open Edit Modal
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteInventory(item.inventoryID)} // Delete Inventory Item
                    >
                      Delete
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
                      onClick={() => handleEditSupplier(supplier)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteSupplier(supplier.supplierID)}
                    >
                      Delete
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
                      style={{ borderRadius: "4px" }}
                      onClick={() => setEditGuest(guest)} // Opens the Edit modal
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      style={{ borderRadius: "4px" }}
                      onClick={() => handleDeleteGuest(guest.guestID)} // Deletes the guest
                    >
                      Delete
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
      <div className="d-flex flex-column bg-dark text-white vh-100" style={{ width: "240px" }}>
  <div className="p-3 border-bottom text-center fw-bold">Admin Dashboard</div>
  <ul className="nav flex-column">
    <li className={`nav-item p-2 ${activeTab === "guests" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("guests")}>
      Guests
    </li>
    <li className={`nav-item p-2 ${activeTab === "inventory" ? "bg-primary text-white" : ""}`} onClick={() => setActiveTab("inventory")}>
      Inventory
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
</div>


      </div>
      
      {editInventory && (
  <div style={styles.modalBackdrop}>
 
  </div>
)}

{notification && (
  <div className="alert alert-success position-fixed top-0 end-0 m-3" style={{ zIndex: 2000 }}>
    {notification}
  </div>
)}

    </div>
  );
};

export default AdminDashboard;
