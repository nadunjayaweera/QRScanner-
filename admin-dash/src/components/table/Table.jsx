// import React from 'react'
// import "./table.scss"
// import { DataGrid } from '@mui/x-data-grid';
// import { userColumns , userRows } from '../../datatablesource';
// import { Link } from 'react-router-dom';

// const Datatable = () => {
//   const actionColumn = [
//     {
//       field:"action",
//       headerName:"Action",
//       width:200,
//       renderCell:()=>{
//         return(
//           <div className='cellAction'>
//             <Link to = "/users/test" style={{textDecoration : "none"}}>
//             <div className="viewButton">View</div>
//             </Link>
//             <div className="deleteButton">Delete</div>
//           </div>
//         )
//       }
//     }

//   ]
//   return (
//     <div className='datatable'>
//       <div className="datatableTitle">
//         View Products
//         {/* <Link to="/users/new" style={{textDecoration : "none"}} className='link'>
//           Add New
//         </Link> */}
//       </div>
// <DataGrid
//         rows={userRows}
//         columns={userColumns.concat(actionColumn)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[7, 5]}
//         checkboxSelection
//       />
//     </div>
//   )
// }

// export default Datatable

// import React, { useState } from 'react';
// import "./table.scss";
// import { DataGrid } from '@mui/x-data-grid';
// import { userColumns , userRows } from '../../datatablesource';
// import { Link } from 'react-router-dom';

// const Datatable = () => {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [filteredRows, setFilteredRows] = useState(userRows); // Initial state with all rows

//   const handleFilter = () => {
//     if (startDate && endDate) {
//       const filteredData = userRows.filter(row => {
//         const rowDataDate = new Date(row.date);
//         return rowDataDate >= startDate && rowDataDate <= endDate;
//       });
//       setFilteredRows(filteredData);
//     }
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: () => {
//         return (
//           <div className='cellAction'>
//             <Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             <div className="deleteButton">Delete</div>
//           </div>
//         )
//       }
//     }
//     // Add more action columns if needed
//   ];

//   return (
//     <div className='datatable'>
//       <div className="datatableTitle">
//         View Products
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(new Date(e.target.value))}
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(new Date(e.target.value))}
//         />
//         <button onClick={handleFilter}>Apply Filter</button>
//       </div>
//       <DataGrid
//         rows={filteredRows}
//         columns={userColumns.concat(actionColumn)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[7, 5]}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default Datatable;

// import React, { useState } from 'react';
// import "./table.scss";
// import { DataGrid } from '@mui/x-data-grid';
// import { userColumns , userRows } from '../../datatablesource';
// import { Link } from 'react-router-dom';
// import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// const Datatable = () => {
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: null,
//       endDate: null,
//       key: 'selection',
//     }
//   ]);
//   const [filteredRows, setFilteredRows] = useState(userRows);

//   const handleFilter = () => {
//     const filteredData = userRows.filter(row => {
//       const rowDataDate = new Date(row.date);
//       return rowDataDate >= dateRange[0].startDate && rowDataDate <= dateRange[0].endDate;
//     });
//     setFilteredRows(filteredData);
//   };

//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: () => {
//         return (
//           <div className='cellAction'>
//             <Link to="/users/test" style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             <div className="deleteButton">Delete</div>
//           </div>
//         )
//       }
//     }
//     // Add more action columns if needed
//   ];

//   return (
//     <div className='datatable'>
//       <div className="datatableTitle">
//         View Products
//         <DateRangePicker
//           onChange={item => setDateRange([item.selection])}
//           ranges={dateRange}
//         />
//         <button onClick={handleFilter}>Apply Filter</button>
//       </div>
//       <DataGrid
//         rows={filteredRows}
//         columns={userColumns.concat(actionColumn)}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[7, 5]}
//         checkboxSelection
//       />
//     </div>
//   );
// };

// export default Datatable;
import React, { useState, useEffect } from "react";
import "./table.scss";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file;
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Datatable = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    // Extract the start and end dates from dateRange
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    if (!startDate || !endDate) {
      // Handle error or show a message to select dates
      return;
    }

    // Format the dates in 'YYYY-MM-DD' format
    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = endDate.toISOString().split("T")[0];

    try {
      // Make a GET request to your API
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        .split("=")[1];

      const response = await fetch(
        `http://localhost:4003/api/dashboard/products?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        // Handle any errors or invalid token
        console.error("Error fetching table data:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Respond:", data);
      setFilteredRows(data);
    } catch (error) {
      // Handle network errors
      console.error("Error fetching table data:", error);
    }
  };

  const handleFilter = () => {
    // Call fetchTableData to fetch data based on the selected date range
    fetchTableData();
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        View Products
        <DateRangePicker
          onChange={(item) => setDateRange([item.selection])}
          ranges={dateRange}
        />
        <button onClick={handleFilter}>Apply Filter</button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>qrCodeData</TableCell>
              <TableCell>quantity</TableCell>
              <TableCell>note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.qrCodeData}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Datatable;
