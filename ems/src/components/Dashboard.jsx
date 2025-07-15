import Navbar from "./Navbar";
import Register from "./Register";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        {token ? (
          <h3>Welcome to the Dashboard!</h3>
        ) : (
          <>
            <h3>No user logged in. Please register:</h3>
            <Register />
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
