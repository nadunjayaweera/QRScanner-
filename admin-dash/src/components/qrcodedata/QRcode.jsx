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
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const QRcode = () => {
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedQrCodeData, setSelectedQrCodeData] = useState(null);

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
        "https://backscan.tfdatamaster.com/api/dashboard/qrcodedata",
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
      canvas.width = 500;
      canvas.height = 500;
      const context = canvas.getContext("2d");

      await qrcode.toCanvas(canvas, qrCodeData);

      const largerCanvas = document.createElement("canvas");
      largerCanvas.width = 1000;
      largerCanvas.height = 1000;
      const largerContext = largerCanvas.getContext("2d");
      largerContext.drawImage(
        canvas,
        0,
        0,
        largerCanvas.width,
        largerCanvas.height
      );

      const url = largerCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `QRCode_${qrCodeData}.png`;
      link.click();
    } catch (error) {
      console.error("Error exporting QR code:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      const response = await fetch(
        `https://backscan.tfdatamaster.com/api/dashboard/productsdelete/${selectedQrCodeData}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      if (!response.ok) {
        console.error("Error deleting QR code:", response.statusText);
        setError("Error deleting QR code. Please try again.");
        return;
      }

      setConfirmationOpen(false);

      // Filter out the deleted item from the table
      setFilteredRows((prevRows) =>
        prevRows.filter((row) => row.qrCodeData !== selectedQrCodeData)
      );
    } catch (error) {
      console.error("Error deleting QR code:", error);
      setError("Error deleting QR code. Please try again.");
    }
  };

  const handleDeleteIconClick = (qrCodeData) => {
    setConfirmationOpen(true);
    setSelectedQrCodeData(qrCodeData);
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
                  <TableCell>Delete</TableCell>
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
                    <TableCell>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteIconClick(row.qrCodeData)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Confirmation Dialog */}
          <Dialog
            open={confirmationOpen}
            onClose={() => setConfirmationOpen(false)}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this item?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button onClick={() => setConfirmationOpen(false)}>Cancel</button>
              <button onClick={handleDelete}>Delete</button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default QRcode;
