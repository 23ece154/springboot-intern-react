import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employee", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  const handleUpdate = async (id, currentName) => {
  try {
    const newName = prompt("Enter new name", currentName);
    if (!newName || newName.trim() === "") {
      alert("Update cancelled or invalid name");
      return;
    }

    const updatedData = { name: newName };

    await axios.put(`http://localhost:8080/employee/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Employee updated successfully!");
    fetchEmployees();
  } catch (err) {
    console.error("Update error", err);
    alert("Update failed");
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      console.error("Delete error", err);
      alert("Delete failed");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "15px",
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <ol>
        {filteredEmployees.map((emp) => (
          <li key={emp.empId} style={{ marginBottom: "10px" }}>
            <strong>ID:</strong> {emp.empId} &nbsp;|&nbsp;
            <strong>Name:</strong> {emp.name} &nbsp;|&nbsp;
            <strong>Email:</strong> {emp.email} &nbsp;
            <button
              onClick={() => handleUpdate(emp.empId)}
              style={{
                marginLeft: "10px",
                marginRight: "5px",
                padding: "5px 10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(emp.empId)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Employees;
