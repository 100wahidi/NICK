import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function Home() {
  return (
    <div className="home-page">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Choose an action to continue.</p>
        <Link to="/signin">
          <button className="login-button">Sign In</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Log In</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;