import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0", display: "flex", justifyContent: "space-between" }}>
      <h2>Employee Management System</h2>
      {token ? (
        <button onClick={handleLogout}>Login</button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
