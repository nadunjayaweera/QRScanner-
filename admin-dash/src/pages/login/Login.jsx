import React from "react";
import "./login.css";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
      const response = await fetch(
        "http://localhost:4003/api/dashboard/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        Cookies.set("token", data.token, { expires: 1 });
        navigate("/home");
        // Include further logic for a successful login
      } else {
        console.log("Login failed");
        // Handle login failure
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon className="icon1" />
          <input type="text" placeholder="enter your username...." />
        </div>
        <div className="input">
          <KeyIcon className="icon1" />
          <input type="password" placeholder="enter your password.." />
        </div>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
