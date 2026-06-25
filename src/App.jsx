import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Import du gardien
import EmptyPage from "./components/EmptyPage"; // Import du composant de message de feedback
import MainLayout from "./components/layout/Header"; 

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

      {/* 🔓 Routes Publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />

      {/* 🔐 Routes Protégées (Accessibles uniquement si connecté) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Vous pourrez ajouter ici d'autres pages privées (ex: /trading, /sales) */}
      </Route>
      {/* Dans src/App.jsx, tout en bas à l'intérieur de <Routes> */}
      <Route 
        path="*" 
        element={
          <EmptyPage  
          />
        } 
      />
            </Route>

    </Routes>
  );
}

export default App;