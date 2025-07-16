import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Add from "./components/AddEmployee";
import Employees from "./components/Employees";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-employee" element={<Add />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h2 style={{ padding: "2rem" }}>Welcome to the Employee Management System!</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
