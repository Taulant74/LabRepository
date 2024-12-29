import React, { useState } from "react";

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
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
  },
  tableHeader: {
    background: "#1890ff",
    color: "#fff",
  },
  tableHeaderCell: {
    padding: "8px",
    border: "1px solid #ddd",
  },
  tableRow: {
    background: "#fff",
  },
  tableCell: {
    padding: "8px",
    border: "1px solid #ddd",
  },
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  const renderUsersContent = () => (
    <div style={styles.card}>
      <h3>Users</h3>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>ID</th>
            <th style={styles.tableHeaderCell}>Name</th>
            <th style={styles.tableHeaderCell}>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>1</td>
            <td style={styles.tableCell}>John Doe</td>
            <td style={styles.tableCell}>john@example.com</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>2</td>
            <td style={styles.tableCell}>Jane Smith</td>
            <td style={styles.tableCell}>jane@example.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderInventoryContent = () => (
    <div style={styles.card}>
      <h3>Inventory</h3>
      <p>Manage your inventory items here.</p>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>ID</th>
            <th style={styles.tableHeaderCell}>Item Name</th>
            <th style={styles.tableHeaderCell}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>1</td>
            <td style={styles.tableCell}>Laptops</td>
            <td style={styles.tableCell}>50</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>2</td>
            <td style={styles.tableCell}>Desks</td>
            <td style={styles.tableCell}>30</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderMaintenanceRequestContent = () => (
    <div style={styles.card}>
      <h3>Maintenance Request</h3>
      <p>Track maintenance requests here.</p>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>ID</th>
            <th style={styles.tableHeaderCell}>Request Type</th>
            <th style={styles.tableHeaderCell}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>1</td>
            <td style={styles.tableCell}>Electrical</td>
            <td style={styles.tableCell}>Pending</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>2</td>
            <td style={styles.tableCell}>Plumbing</td>
            <td style={styles.tableCell}>Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderStaffContent = () => (
    <div style={styles.card}>
      <h3>Staff</h3>
      <p>View and manage staff details.</p>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>ID</th>
            <th style={styles.tableHeaderCell}>Name</th>
            <th style={styles.tableHeaderCell}>Position</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>1</td>
            <td style={styles.tableCell}>Alice Johnson</td>
            <td style={styles.tableCell}>Manager</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>2</td>
            <td style={styles.tableCell}>Bob Brown</td>
            <td style={styles.tableCell}>Technician</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderSupplierContent = () => (
    <div style={styles.card}>
      <h3>Supplier</h3>
      <p>Manage supplier information here.</p>
      <table style={styles.table}>
        <thead style={styles.tableHeader}>
          <tr>
            <th style={styles.tableHeaderCell}>ID</th>
            <th style={styles.tableHeaderCell}>Supplier Name</th>
            <th style={styles.tableHeaderCell}>Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>1</td>
            <td style={styles.tableCell}>ABC Supplies</td>
            <td style={styles.tableCell}>+123456789</td>
          </tr>
          <tr style={styles.tableRow}>
            <td style={styles.tableCell}>2</td>
            <td style={styles.tableCell}>XYZ Distributors</td>
            <td style={styles.tableCell}>+987654321</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Admin Dashboard</div>
        <ul style={styles.sidebarMenu}>
          <li
            style={{
              ...styles.sidebarMenuItem,
              ...(activeTab === "users" ? styles.sidebarMenuItemActive : {}),
            }}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
          <li
            style={{
              ...styles.sidebarMenuItem,
              ...(activeTab === "inventory" ? styles.sidebarMenuItemActive : {}),
            }}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </li>
          <li
            style={{
              ...styles.sidebarMenuItem,
              ...(activeTab === "maintenance" ? styles.sidebarMenuItemActive : {}),
            }}
            onClick={() => setActiveTab("maintenance")}
          >
            Maintenance Request
          </li>
          <li
            style={{
              ...styles.sidebarMenuItem,
              ...(activeTab === "staff" ? styles.sidebarMenuItemActive : {}),
            }}
            onClick={() => setActiveTab("staff")}
          >
            Staff
          </li>
          <li
            style={{
              ...styles.sidebarMenuItem,
              ...(activeTab === "supplier" ? styles.sidebarMenuItemActive : {}),
            }}
            onClick={() => setActiveTab("supplier")}
          >
            Supplier
          </li>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <button style={styles.headerButton}>View Profile</button>
        </div>
        <div style={styles.content}>
          {activeTab === "users" && renderUsersContent()}
          {activeTab === "inventory" && renderInventoryContent()}
          {activeTab === "maintenance" && renderMaintenanceRequestContent()}
          {activeTab === "staff" && renderStaffContent()}
          {activeTab === "supplier" && renderSupplierContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
