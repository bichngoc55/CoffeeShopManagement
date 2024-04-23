import React from "react";
import "./Loginpage.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginService.js";

const LoginPage = () => {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username: username, password: password };
    loginUser(newUser, dispatch, navigate);
  };
  return (
    <form onsubmit={handleSubmit} className="login-page">
 
      <div className="image-section"></div>
      <div className="form-section">
        <div className="form">
          <label className="welcome">WELCOME BACK</label>

          <label className="please">Please enter your login information</label>

          <div className="form-group">
            <label htmlFor="username" className="user-pass">
              Username
            </label>
            <input
              placeHolder="Enter your username"
              className="inPutText"
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="user-pass">
              Password
            </label>
 
            <input
              placeHolder="Enter your password "
              className="inPutText"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
 
          </div>
          <div className="remember-forgot">
            <div className="remember">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Remember me</span>
            </div>
            <a href="#" className="forgot">
<<<<<<< Updated upstream
              Forgot password
=======
              Forgot password?
>>>>>>> Stashed changes
            </a>
          </div>

 
          <button className="buttonLogin" type="submit">
 
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
