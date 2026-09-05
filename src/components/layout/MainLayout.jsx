import { Outlet } from "react-router-dom"; // <-- Crucial pour le Nested Routing
import Header from "./Header";
import Footer from "./Footer";
import BackGround from "./assets/BackGround.png"; 

function MainLayout() {
  return (
    <div className="app-shell">
      <div
        className="app-background"
        style={{ backgroundImage: `url(${BackGround})` }}
        aria-hidden="true"
      />

      <div className="app-overlay" aria-hidden="true" />

      <div className="app-content">
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;