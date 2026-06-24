import { useState } from "react";

function SignIn() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    role: "",
    country: "",
    region: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:3000/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert("Error: " + data.detail);
      } else {
        console.log("User created ✅", data);
        alert("Account created ✅");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign In 👤</h1>

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

          <input
            className="auth-input"
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />

          <input
            className="auth-input"
            type="text"
            name="region"
            placeholder="Region"
            value={form.region}
            onChange={handleChange}
          />

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;