import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./addqr.scss";
import Sidebar from "../../components/sidebar/Sidebar";

const AddQr = () => {
  const [qrData, setQrData] = useState("");
  const [description, setDescription] = useState("");
  const [backendResponse, setBackendResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Send both QR code data and description to the backend with the authorization header
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      const response = await fetch(
        "https://backscan.tfdatamaster.com/api/dashboard/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ qrCodeData: qrData, description }),
        }
      );

      const responseData = await response.json();
      setBackendResponse(responseData); // Set the backend response in state

      // Clear input fields after successful submission
      setQrData("");
      setDescription("");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  return (
    <div className="addQR">
      <Sidebar />
      <div className="addQRContainer">
        <div className="listTitle">Add QR Details </div>

        {/* Form */}
        <form className="qrForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="qrCode">QR Code:</label>
            <input
              type="text"
              id="qrCode"
              name="qrCode"
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        {/* Display QR Code */}
        {qrData && (
          <div className="qrCodeContainer">
            <QRCode value={qrData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddQr;
