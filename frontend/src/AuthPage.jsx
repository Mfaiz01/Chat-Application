import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import logo from './assets/logo.png'; // Adjust based on your actual file location and extension

const AuthPage = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const { value: username } = e.target[0];
    const { value: password } = e.target[1];
    const { value: confirmPassword } = e.target[2];

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3001/authenticate", { username, password })
      .then((r) => props.onAuth({ ...r.data, secret: username }))
      .catch((e) => {
        console.log("error", e);
        setErrorMessage("Authentication failed");
      });
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="form-title">ChatterPro</div>
        <div className="form-subtitle">Set a username and password to get started</div>
        <div className="auth">
          <label className="auth-label" htmlFor="username">Username</label>
          <input className="auth-input" name="username" id="username" />
        </div>
        <div className="auth">
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            type="password"
            className="auth-input"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth">
          <label className="auth-label" htmlFor="confirmPassword">Confirm Password</label>
          <div className="auth-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="auth-input"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i
              className={`eye-icon fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="auth-button" type="submit">Enter</button>
      </form>
    </div>
  );
};

AuthPage.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

export default AuthPage;
