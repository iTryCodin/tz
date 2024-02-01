import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  function clickHandler() {
    fetch("http://server/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        localStorage.setItem('token', data.token); // Сохранение токена в localStorage
        localStorage.setItem('id', data.id); // Сохранение id в localStorage
        navigate('/tasks');
      }
    })
    .catch((error) => {
      console.log("Ошибка при отправке запроса:", error);
    });
  }
  
  const isAuthorized = isAuthenticated();

  function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  if (isAuthorized) {
    return null; // If the user is already authorized, render nothing else
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={clickHandler}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}