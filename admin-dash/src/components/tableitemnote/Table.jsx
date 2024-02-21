import React, { useState, useEffect } from "react";
import "./table.scss";
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
import "jspdf-autotable";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const DatatableItemnote = () => {
  const [qrCodeData, setQrCodeData] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    // Initially, load all data
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      let apiUrl = "http://backscan.tfdatamaster.com/api/dashboard/qritemdata";

      if (qrCodeData) {
        apiUrl += `?qrCodeData=${qrCodeData}`;
      } else if (selectedDate) {
        apiUrl += `?startDate=${selectedDate.startDate.toISOString()}&endDate=${selectedDate.endDate.toISOString()}`;
      }
      console.log("API URL:", apiUrl);
      console.log("TOKEN:", token);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        console.error("Error fetching table data:", response.statusText);
        return;
      }

      const data = await response.json();
      setAllData(data);
      setFilteredRows(data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleFilter = () => {
    filterDataByDate();
  };

  const filterDataByDate = () => {
    if (!selectedDate) {
      setFilteredRows(allData);
    } else {
      const filteredData = allData.filter((row) => {
        const rowDate = new Date(row.date);
        return (
          rowDate >= selectedDate.startDate && rowDate <= selectedDate.endDate
        );
      });
      setFilteredRows(filteredData);
    }
  };

  const handleFind = () => {
    fetchTableData();
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const tableData = filteredRows.map((row) => [
      row.qrCodeData,
      row.quantity,
      row.description,
      new Date(row.date).toLocaleDateString(),
      row.note,
    ]);

    doc.autoTable({
      head: [["QR CodeData", "Quantity", "Description", "Date", "Note"]],
      body: tableData,
    });
    doc.save("checkout_data.pdf");
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <p className="title-name" style={{ marginLeft: "180px" }}>
          VIEW PRODUCT
          <br />
          NOTE
        </p>
        <input
          className="input-f"
          type="text"
          placeholder="QR Code Data"
          value={qrCodeData}
          onChange={(e) => setQrCodeData(e.target.value)}
        />

        <button className="button-Find" onClick={handleFind}>
          Find
          <div class="arrow-wrapper">
            <div class="arrow"></div>
          </div>
        </button>

        <DateRangePicker
          onChange={(item) => setSelectedDate(item.selection)}
          ranges={[
            {
              startDate: selectedDate?.startDate,
              endDate: selectedDate?.endDate,
              key: "selection",
            },
          ]}
        />
        <div>
          <button
            onClick={handleFilter}
            class="button"
            style={{ marginBottom: "20px" }}
          >
            <FilterAltIcon />
            Apply Filter
          </button>
          <button onClick={exportAsPDF} class="buttonDownload">
            Download PDF
          </button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "rgb(0, 9, 252)" }}>
              <TableCell style={{ color: "white" }}>QR Code Data</TableCell>
              <TableCell style={{ color: "white" }}>Quantity</TableCell>
              <TableCell style={{ color: "white" }}>Description</TableCell>
              <TableCell style={{ color: "white" }}>Note</TableCell>
              <TableCell style={{ color: "white" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.qrCodeData}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DatatableItemnote;
