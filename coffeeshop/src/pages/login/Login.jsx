import React from "react";
import "./Loginpage.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="image-section"></div>
      <div className="form-section">
        <div className="form">
          <label className="welcome">WELCOME BACK!</label>
          <label className="please">Please enter your login information</label>

          <div className="form-group">
            <label htmlFor="username" className="user-pass">
              Username
            </label>
            <input type="text" id="username" />
          </div>

          <div>
            <label htmlFor="password" className="user-pass">
              Password
            </label>
            <input type="text" id="password" />
          </div>

          <div className="remember-forgot">
            <div className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <a href="#" className="forgot">
              Forgot password
            </a>
          </div>

          <button type="submit">Login!</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
