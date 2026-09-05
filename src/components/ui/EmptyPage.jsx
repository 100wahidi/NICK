import { useNavigate } from "react-router-dom";

function EmptyPage({ 
  title = "Page not found", 
  message = "The page you are looking for does not exist or is unavailable.", 
  icon = "🔍", 
  buttonText = "Back to home", 
  redirectTo = "/" 
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (redirectTo === 0) {
      navigate(0);
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <div className="auth-page" role="alert" aria-live="assertive">
      <div className="auth-card" style={{ textAlign: "center", padding: "30px" }}>
        <div 
          style={{ fontSize: "3.5rem", marginBottom: "15px" }} 
          aria-hidden="true"
        >
          {icon}
        </div>

        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "600", 
          marginBottom: "10px", 
          color: "var(--text)" 
        }}>
          {title}
        </h2>

        <p style={{ 
          fontSize: "0.95rem", 
          lineHeight: "1.5", 
          marginBottom: "25px", 
          color: "var(--text-light)" 
        }}>
          {message}
        </p>

        {buttonText && (
          <button 
            type="button"
            className="auth-button" 
            onClick={handleAction}
            style={{ width: "100%", cursor: "pointer" }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyPage;