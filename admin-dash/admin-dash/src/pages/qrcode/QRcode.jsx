import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import "react-circular-progressbar/dist/styles.css";
import QRcode from "../../components/qrcodedata/QRcode";

const QRCode = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="listContainer">
          <div className="listTitle">Available Products</div>
          <QRcode />
        </div>
      </div>
    </div>
  );
};

export default QRCode;
