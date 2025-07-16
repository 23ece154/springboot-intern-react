import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForm.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userName,
        password,
      });

      const token = response.data;
      console.log("Token received:", token);

      if (token) {
        localStorage.setItem("token", token);
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Login failed: Token not received");
      }
    } catch (e) {
      console.error("Login Error:", e);
      alert("Invalid Credentials");
    }
  }

  return (
    <section >
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>User Name</label>
          <input
            value={userName}
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br /><br />
          <label>Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          <button type="submit">Login</button>
        </form>
        <br />
        <p>New here? <Link to="/register">Register here</Link></p>
      </div>
    </section>
  );
};

export default Login;

