import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import EmptyPage from "./components/EmptyPage"; // Ou FeedbackMessage selon vos fichiers

function App() {
  return (
    <Routes>
      {/* ─── ROUTE PARENTE GLOBALE ─── */}
      {/* Elle charge MainLayout et applique le Header à tout son arbre inférieur */}
      <Route element={<MainLayout />}>
        
        {/* 🔓 Routes Publiques Enfants */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        {/* 🔐 Routes Protégées Enfants (Double Imbrication Pro) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* 🧭 Capture d'erreur 404 dans le Layout */}
        <Route path="*" element={<EmptyPage />} />
        
      </Route>
    </Routes>
  );
  
}

export default App;