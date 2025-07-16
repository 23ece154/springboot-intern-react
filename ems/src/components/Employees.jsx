import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get("http://localhost:8080/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
        alert("Access denied. Please login as authorized user.");
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Registered Employees</h2>
      <ul>
        {employees.map((emp, index) => (
          <li key={index}>
            <strong>Name:</strong> {emp.name} <br />
            <strong>Email:</strong> {emp.email}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;
