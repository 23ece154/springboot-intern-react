import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Employee Management System</h2>
      </div>
      <div className="navbar-right">
        <Link to="/employees">Employees</Link>
        <Link to="/add-employee">AddEmployee</Link>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            {/* <Link to="/register">Register</Link> */}
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
