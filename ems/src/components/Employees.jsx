// import { useEffect, useState } from "react";
// import axios from "axios";

// const Employees = () => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get("http://localhost:8080/employee", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => setEmployees(res.data))
//       .catch((err) => console.error("Failed to fetch employees", err));
//   }, []);

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Registered Employees</h2>
//       <ul>
//         {employees.map((emp, index) => (
//           <li key={index}>
//             <strong>Name:</strong> {emp.name} <br />
//             <strong>Email:</strong> {emp.email}
//             <hr />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Employees;

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/employee.css";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees", err);
        alert("Unauthorized or Error");
      }
    };

    fetchEmployees();
  }, [token]);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.empId !== empId));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee", err);
      alert("Delete failed");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/employee/${editEmployee.empId}`, editEmployee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.map(emp => emp.empId === editEmployee.empId ? editEmployee : emp));
      alert("Employee updated successfully");
      setEditEmployee(null);
    } catch (err) {
      console.error("Error updating employee", err);
      alert("Update failed");
    }
  };

  return (
    <div className="employee-container">
      <h2>Employee List</h2>
      <p>Logged in as: {role}</p>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            {(role === "ROLE_ADMIN" || role === "ROLE_USER") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                {(role === "ROLE_ADMIN" || role === "ROLE_USER") && (
                  <>
                    <button
                      onClick={() => setEditEmployee(emp)}
                      className="btn edit-btn"
                    >
                      Edit
                    </button>
                    {role === "ROLE_ADMIN" && (
                      <button
                        onClick={() => handleDelete(emp.empId)}
                        className="btn delete-btn"
                      >
                        Delete
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editEmployee && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h5>Edit Employee</h5>
              <button className="close-btn" onClick={() => setEditEmployee(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="name"
                value={editEmployee.name}
                onChange={handleEditChange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={editEmployee.email}
                onChange={handleEditChange}
                placeholder="Email"
              />
            </div>
            <div className="modal-footer">
              <button className="btn cancel-btn" onClick={() => setEditEmployee(null)}>Cancel</button>
              <button className="btn save-btn" onClick={handleEditSubmit}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;