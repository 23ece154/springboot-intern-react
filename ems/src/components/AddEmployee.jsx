import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../styles/AuthForm.css";


const Add = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");

  const navigate = useNavigate(); 

  async function handleRegister(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        userName,
        password,
        roleNames: [role] 
      });
      console.log(response.data);
      alert("Employee added Successfully");
 
    } catch (e) {
      console.log("employee post Error", e);
      alert("Employee post method failed");
    }
  }

  return (
    <section >
      <div className="auth-card">
      <h2>Add Employee</h2>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setname(e.target.value)} /><br />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} /><br />

        <label>Username</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /><br />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />

        <label>Role</label>
        <input type="text" value={role} onChange={(e) => setrole(e.target.value)} /><br /><br />

        <button type="submit">Add Employee</button>
      </form>
      </div>
    </section>
  );
};

export default Add;
