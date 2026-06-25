import { Outlet } from "react-router-dom"; // <-- TRÈS IMPORTANT
import Header from "./Header";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      {/* C'est ici que React Router va injecter Home, Login, etc. */}
      <main style={{ flex: 1 }}>
        <Outlet /> 
      </main>
      
      <Footer />
    </div>
  );
}

export default MainLayout;