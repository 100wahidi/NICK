import { Link } from "react-router-dom";
import { getToken } from "../Share/token";

function Home() {
  const isAuthenticated = !!getToken();

  return (
    <div className="home-container">
      {/* 🚀 Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">
            Simplifiez votre accès aux <span className="text-gradient">Marchés Financiers</span>
          </h1>
          <p className="hero-subtitle">
            Une plateforme robuste et sécurisée conçue pour optimiser vos stratégies de trading, 
            suivre vos indicateurs clés et gérer vos opérations de vente en toute confiance.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary-home">
                Accéder au Dashboard 📊
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary-home">
                  Se Connecter 🔐
                </Link>
                <Link to="/signin" className="btn btn-secondary-home">
                  Créer un compte 👤
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 📊 Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Pourquoi choisir Market Access ?</h2>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon"></div>
              <h3>Trading avancé</h3>
              <p>Accédez à des outils analytiques et suivez l'exécution de vos stratégies en temps réel</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon"></div>
              <h3>Gestion Sales</h3>
              <p>Pilotez la relation client et suivez vos indicateurs de performance commerciale</p>
            </article>

            <article className="feature-card">
              <div className="feature-icon"></div>
              <h3>Sécurité Maximale</h3>
              <p>Vos sessions et vos données sont protégées par des protocoles d'authentification stricts</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;