import * as React from "react";
import "./style.css";
function Button({ children }) {
  return (
    <button className="button">
      {children}
      <style jsx>{`
        .button {
          border-radius: 10px;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          background-color: #714534;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          justify-content: center;
          margin: 56px 11px 0;
          padding: 23px 60px;
          font: 700 32px/150% Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        @media (max-width: 991px) {
          .button {
            max-width: 100%;
            white-space: initial;
            margin: 40px 10px 0 0;
            padding: 0 20px;
          }
        }
      `}</style>
    </button>
  );
}

export default function Login() {
  return (
    <>
      <main className="main-container">
        <div className="columns-container">
          <div className="image-column">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4b939c6906a86ca7acfc0e7706bce857112c657999dd4631c999dfa049c9921?apiKey=66d4ed18ddd644318c1a3400dc991fac&"
              alt=""
              className="image"
            />
          </div>
          <div className="content-column">
            <div className="content-wrapper">
              <h1 className="title">WELCOME BACK</h1>
              <p className="description">Please enter your login information</p>
              <form>
                <label htmlFor="username" className="visually-hidden">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  aria-label="Username"
                  className="input"
                />
                <label htmlFor="password" className="visually-hidden">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="input"
                />
                <div className="options-container">
                  <div className="remember-me">Remember me</div>
                  <div className="forgot-password">Forget password?</div>
                </div>
                <Button>LOGIN</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
