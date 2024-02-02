import React, { useState } from "react";
import "./sidebar.scss";
import PersonIcon from "@mui/icons-material/Person";
import CropFreeIcon from "@mui/icons-material/CropFree";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Logo from "../../assets/Logo.png";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); // Replace '/login' with your actual login route
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SCAN ME</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN OPTIONS</p>
          <Link
            to="/home"
            style={{ textDecoration: "none" }}
            onClick={() => handleLinkClick("/home")}
          >
            <li className={activeLink === "/home" ? "active" : ""}>
              <PersonIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>

          <Link
            to="/itemnote"
            style={{ textDecoration: "none" }}
            onClick={() => handleLinkClick("/itemnote")}
          >
            <li className={activeLink === "/itemnote" ? "active" : ""}>
              <EventNoteIcon className="icon" />
              <span>Products Notes</span>
            </li>
          </Link>

          <Link
            to="/qrcodedata"
            style={{ textDecoration: "none" }}
            onClick={() => handleLinkClick("/qrcodedata")}
          >
            <li className={activeLink === "/qrcodedata" ? "active" : ""}>
              <CropFreeIcon className="icon" />
              <span>QR Code Data</span>
            </li>
          </Link>

          <Link
            to="/add-qr"
            style={{ textDecoration: "none" }}
            onClick={() => handleLinkClick("/add-qr")}
          >
            <li className={activeLink === "/add-qr" ? "active" : ""}>
              <QrCode2Icon className="icon" />
              <span>Add QR</span>
            </li>
          </Link>

          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <img src={Logo} alt="logo" className="Logo-main" />
    </div>
  );
};

export default Sidebar;
