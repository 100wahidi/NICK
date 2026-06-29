import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import RAG from "./pages/RAG"; // ✅ NEW
import ProtectedRoute from "./components/ProtectedRoute";
import EmptyPage from "./components/EmptyPage";

function App() {
  return (
    <Routes>
      {/* ─── GLOBAL LAYOUT ─── */}
      <Route element={<MainLayout />}>

        {/* 🔓 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        {/* 🔐 Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ✅ NEW RAG PAGE */}
          <Route path="/analyser" element={<RAG />} />
        </Route>

        {/* 🧭 404 */}
        <Route path="*" element={<EmptyPage />} />

      </Route>
    </Routes>
  );
}

export default App;