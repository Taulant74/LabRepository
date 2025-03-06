import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ emri: "", departamenti: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const apiUrl = "https://localhost:7085/api/Ligjeruesi"; // Adjust API URL

  const fetchLecturers = async () => {
    try {
      const response = await axios.get(apiUrl);
      setLecturers(response.data);
    } catch (error) {
      console.error("Error fetching lecturers:", error);
    }
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/${editId}`, formData);
      } else {
        await axios.post(apiUrl, formData);
      }
      fetchLecturers();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving lecturer:", error);
    }
  };

  const handleEdit = (lecturer) => {
    setIsEditing(true);
    setEditId(lecturer.lecturerID);
    setFormData(lecturer);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecturer?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchLecturers();
      } catch (error) {
        console.error("Error deleting lecturer:", error);
      }
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setFormData({ emri: "", departamenti: "", email: "" });
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h1>Lecturers</h1>
      <Button variant="primary" onClick={handleAdd} className="mb-3">Add Lecturer</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map((lecturer) => (
            <tr key={lecturer.lecturerID}>
              <td>{lecturer.emri}</td>
              <td>{lecturer.departamenti || "N/A"}</td>
              <td>{lecturer.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(lecturer)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(lecturer.lecturerID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Lecturer" : "Add Lecturer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="emri" value={formData.emri} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" name="departamenti" value={formData.departamenti} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">{isEditing ? "Update" : "Add"} Lecturer</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Lecturers;
