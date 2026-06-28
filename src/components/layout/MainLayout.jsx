import React from "react";
import { Outlet } from "react-router-dom"; // <-- Crucial pour le Nested Routing
import Header from "./Header";

function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Reste monté en permanence (évite le clignotement) */}
      <Header />
      
      {/* Zone dynamique où React Router va injecter vos pages enfants */}
      <main style={{ flex: 1, width: "100%" }}>
        <Outlet /> 
      </main>
    </div>
  );
}

export default MainLayout;