import React, { useState } from "react";
import "./login.css";
import KeyIcon from "@mui/icons-material/Key";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginV from "../../assets/login-vec.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [isWrongCredentials, setIsWrongCredentials] = useState(false);

  const handleLogin = async () => {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
      const response = await fetch(
        "https://backscan.tfdatamaster.com/api/dashboard/login", // https://backscan.tfdatamaster.com
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
        setIsWrongCredentials(true); // Set wrong credentials state to true
        setTimeout(() => {
          setIsWrongCredentials(false); // Reset wrong credentials state after a delay
        }, 500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  const shakeButtonClass = isWrongCredentials ? "shake" : "";

  return (
    <div className="container">
      <div class="dots"></div>
      <img src={LoginV} alt="login-vector" />
      <div className="header">
        <div className="text">Login</div>

        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <PersonIcon className="icon1" />
          <input type="text" className="custom-input" placeholder="User Name" />
        </div>
        <div className="input">
          <KeyIcon className="icon1" />
          <input
            type="password"
            className="custom-input"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="submit-container">
        <div className={`submit ${shakeButtonClass}`} onClick={handleLogin}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
