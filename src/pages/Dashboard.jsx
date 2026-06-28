import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Welcome to Market Access 📊</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate("/trading")}>
          <h2>Trading 📈</h2>
          <p>Access trading tools and strategies</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/sales")}>
          <h2>Sales 💼</h2>
          <p>Manage clients and sales operations</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
