import { useState } from "react";
import { userAPI } from "../Api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await userAPI.login(form);

      console.log("✅ Token reçu:", data);

      // ✅ stocker token
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      alert("Login successful ✅");

      // ✅ redirection
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Log In 🔐</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="auth-button" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;