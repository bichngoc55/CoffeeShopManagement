import * as React from "react";
<<<<<<< Updated upstream
import "./style.css";
function Button({ children }) {
  return (
    <button className="button">
      {children}
      <style jsx>{`
        .button {
          border-radius: 10px;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
=======

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function Input({ label, type, id, placeholder }) {
  return (
    <>
      <label htmlFor={id} className="visually-hidden">
        {label}
      </label>
      <input
        className="input"
        type={type}
        id={id}
        placeholder={placeholder}
        aria-label={label}
      />
    </>
  );
}

export function MyComponent() {
  return (
    <>
      <main className="main-container">
        <div className="columns-container">
          <div className="column image-column">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4b939c6906a86ca7acfc0e7706bce857112c657999dd4631c999dfa049c9921?apiKey=66d4ed18ddd644318c1a3400dc991fac&"
              className="image"
              alt="Decorative background"
            />
          </div>
          <div className="column form-column">
            <div className="form-container">
              <h1 className="form-title">WELCOME BACK</h1>
              <p className="form-description">
                Please enter your login information
              </p>
              <form>
                <div className="form-group">
                  <Input
                    label="Username"
                    type="text"
                    id="username"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <Input
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-options">
                  <div className="remember-me">Remember me</div>
                  <div className="forgot-password">Forget password?</div>
                </div>
                <Button>LOGIN</Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .main-container {
          background-color: #f9f8fb;
        }

        .columns-container {
          display: flex;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .columns-container {
            flex-direction: column;
            align-items: stretch;
            gap: 0;
          }
        }

        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
        }

        .image-column {
          width: 57%;
          margin-left: 0;
        }

        @media (max-width: 991px) {
          .image-column {
            width: 100%;
          }
        }

        .image {
          aspect-ratio: 0.76;
          object-fit: cover;
          width: 100%;
          flex-grow: 1;
        }

        @media (max-width: 991px) {
          .image {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .form-column {
          width: 43%;
          margin-left: 20px;
        }

        @media (max-width: 991px) {
          .form-column {
            width: 100%;
          }
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          font-size: 26px;
          color: #412d26;
          font-weight: 500;
          margin: auto 0;
          padding: 0 20px;
        }

        @media (max-width: 991px) {
          .form-container {
            max-width: 100%;
            margin-top: 40px;
          }
        }

        .form-title {
          color: #714534;
          align-self: center;
          font: 700 32px Kumbh Sans, -apple-system, Roboto, Helvetica,
            sans-serif;
          margin: 0;
        }

        .form-description {
          font-family: Kumbh Sans, sans-serif;
          margin: 32px 11px 0;
        }

        @media (max-width: 991px) {
          .form-description {
            max-width: 100%;
            margin-right: 10px;
          }
        }

        .form-group {
          margin-top: 40px;
        }

        .input {
          font-family: Kumbh Sans, sans-serif;
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .form-options {
          display: flex;
          margin-top: 40px;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .form-options {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }

        .remember-me,
        .forgot-password {
          font-family: Kumbh Sans, sans-serif;
          flex-grow: 1;
          flex-basis: auto;
        }

        .button {
          border-radius: 10px;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
>>>>>>> Stashed changes
          background-color: #714534;
          color: #fff;
          white-space: nowrap;
          text-align: center;
          justify-content: center;
          margin: 56px 11px 0;
          padding: 23px 60px;
          font: 700 32px/150% Montserrat, -apple-system, Roboto, Helvetica,
            sans-serif;
<<<<<<< Updated upstream
=======
          cursor: pointer;
          border: none;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
    </>
  );
}
