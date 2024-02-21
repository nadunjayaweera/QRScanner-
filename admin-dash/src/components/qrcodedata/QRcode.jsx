import React, { useState, useEffect } from "react";
import "./qrcode.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { jsPDF } from "jspdf";
import QRCode from "react-qr-code";
import qrcode from "qrcode";

const QRcode = () => {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      const response = await fetch(
        `https://backscan.tfdatamaster.com/api/dashboard/qrcodedata`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        console.error("Error fetching table data:", response.statusText);
        setError("Error fetching table data. Please try again.");
        return;
      }

      const data = await response.json();
      setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setError("Error fetching table data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exportQRCode = async (qrCodeData) => {
    try {
      const canvas = document.createElement("canvas");
      // Set a larger canvas size (e.g., 500x500)
      canvas.width = 500;
      canvas.height = 500;
      const context = canvas.getContext("2d");

      // Generate QR code
      await qrcode.toCanvas(canvas, qrCodeData);

      // Draw the canvas on a larger canvas to improve quality
      const largerCanvas = document.createElement("canvas");
      largerCanvas.width = 1000; // Choose a larger size for better quality
      largerCanvas.height = 1000;
      const largerContext = largerCanvas.getContext("2d");
      largerContext.drawImage(
        canvas,
        0,
        0,
        largerCanvas.width,
        largerCanvas.height
      );

      // Convert the larger canvas to a data URL and trigger a download
      const url = largerCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `QRCode_${qrCodeData}.png`;
      link.click();
    } catch (error) {
      console.error("Error exporting QR code:", error);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">View QRCode</div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>QR Code Data</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>QR Code</TableCell>
                  <TableCell>Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.qrCodeData}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <QRCode value={row.qrCodeData} size={100} />
                    </TableCell>
                    <TableCell>
                      <button onClick={() => exportQRCode(row.qrCodeData)}>
                        Download
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default QRcode;
