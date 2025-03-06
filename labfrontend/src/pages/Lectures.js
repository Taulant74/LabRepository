import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ lectureName: "", lecturerID: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const apiUrl = "https://localhost:7085/api/Ligjerata";

  const fetchLectures = async () => {
    try {
      const response = await axios.get(apiUrl);
      setLectures(response.data);
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  useEffect(() => {
    fetchLectures();
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
      fetchLectures();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving lecture:", error);
    }
  };

  const handleEdit = (lecture) => {
    setIsEditing(true);
    setEditId(lecture.lectureID);
    setFormData(lecture);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchLectures();
      } catch (error) {
        console.error("Error deleting lecture:", error);
      }
    }
  };

  const handleAdd = () => {
    setIsEditing(false);
    setFormData({ lectureName: "", lecturerID: "" });
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h1>Lectures</h1>
      <Button variant="primary" onClick={handleAdd} className="mb-3">Add Lecture</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Lecture Name</th>
            <th>Lecturer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map((lecture) => (
            <tr key={lecture.lectureID}>
              <td>{lecture.lectureName}</td>
              <td>{lecture.lecturerID}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(lecture)} className="me-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(lecture.lectureID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Lecture" : "Add Lecture"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Lecture Name</Form.Label>
              <Form.Control type="text" name="lectureName" value={formData.lectureName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lecturer ID</Form.Label>
              <Form.Control type="number" name="lecturerID" value={formData.lecturerID} onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">{isEditing ? "Update" : "Add"} Lecture</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Lectures;
