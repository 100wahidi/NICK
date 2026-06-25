import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../Share/token"; // Assurez-vous du bon chemin

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = !!getToken(); // Renvoie true si un token existe

  const handleLogout = () => {
    removeToken(); // Supprime proprement le token unifié
    navigate("/login");
  };

  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Logo / Marque */}
        <Link to="/" className="header-logo">
          Market Access <span className="logo-icon"></span>
        </Link>
        
        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <button 
                type="button"
                onClick={handleLogout}
                className="btn-logout"
              >
                Logout 🔓
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log In</Link>
              <Link to="/signin" className="btn btn-primary-header">Sign In</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;