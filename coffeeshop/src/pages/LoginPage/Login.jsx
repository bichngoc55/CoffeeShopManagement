import React from "react";
import "./Loginpage.css";

import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginService.js";

const LoginPage = () => {
  const [emailInput, setUsername] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { email: emailInput, password: passwordInput };
    try {
      const result = await loginUser(newUser, dispatch, navigate);
      if (result && result.success) {
        navigate("/stuff");
      } else {
        setErrorMessage(" *Not found user, incorrect email or password");
      }
    } catch (err) {
      // Xử lý lỗi nếu có
      console.error(err);
    }
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    console.log(emailInput);
    fetch("http://localhost:3005/auth/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        alert(data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-page">
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
              className={`inputText ${errorMessage ? "error" : ""}`}
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="formgr">
            <label htmlFor="password" className="user-pass">
              Password
            </label>

            <input
              placeHolder="Enter your password "
              className={`inputText ${errorMessage ? "error" : ""}`}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <label className="error-message">{errorMessage}</label>
            )}
          </div>
          <div className="remember-forgot">
            <div className="remember">
              <input type="checkbox" />
              <span style={{ marginLeft: "5px" }}>Remember me</span>
            </div>

            <a href="#" className="forgot" onClick={forgotPassword}>
              Forgot password?
            </a>
          </div>

          <button onClick={handleSubmit} className="buttonLogin" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
