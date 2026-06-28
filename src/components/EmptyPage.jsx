import { useNavigate } from "react-router-dom";

/**
 * Composant de secours et de retour d'information (Erreurs, 404, Non autorisé).
 * Conçu pour être MVP, robuste et conforme aux standards de production.
 */
function EmptyPage({ 
  title = "Page non trouvée", 
  message = "La page que vous recherchez n'existe pas.", 
  icon = "🔍", 
  buttonText = "Retour à l'accueil", 
  redirectTo = "/" 
}) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (redirectTo === 0) {
      // Cas spécial : Rafraîchir la page actuelle
      navigate(0);
    } else {
      navigate(redirectTo);
    }
  };

  return (
    <div className="auth-page" role="alert" aria-live="assertive">
      <div className="auth-card" style={{ textAlign: "center", padding: "30px" }}>
        {/* Icône / Émoji visuel */}
        <div 
          style={{ fontSize: "3.5rem", marginBottom: "15px" }} 
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Titre du message */}
        <h2 style={{ 
          fontSize: "1.5rem", 
          fontWeight: "600", 
          marginBottom: "10px", 
          color: "var(--text)" 
        }}>
          {title}
        </h2>

        {/* Description / Explication */}
        <p style={{ 
          fontSize: "0.95rem", 
          lineHeight: "1.5", 
          marginBottom: "25px", 
          color: "var(--text-light)" 
        }}>
          {message}
        </p>

        {/* Bouton d'action principal conditionnel */}
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