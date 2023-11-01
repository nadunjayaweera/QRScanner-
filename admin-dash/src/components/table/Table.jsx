
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


import React, { useState, useEffect } from 'react';
import "./table.scss";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Datatable = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection',
    }
  ]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [userColumns, setUserColumns] = useState([]);

  useEffect(() => {
    // Fetch data from the backend for columns and rows
    fetchColumnData(); // Function to fetch column data
    fetchRowData();    // Function to fetch row data
  }, []);

  // Function to fetch column data
  const fetchColumnData = async () => {
    try {
      // Make an API call to get column data
      // Example response format: { columns: [ { field: 'id', headerName: 'ID' }, ... ] }
      const response = await fetch('backend/columns');
      const data = await response.json();
      setUserColumns(data.columns);
    } catch (error) {
      // Handle error
      console.error('Error fetching column data:', error);
    }
  };

  // Function to fetch row data
  const fetchRowData = async () => {
    try {
      // Make an API call to get row data
      // Example response format: { rows: [ { id: 1, name: 'John Doe' }, ... ] }
      const response = await fetch('backend/rows');
      const data = await response.json();
      setFilteredRows(data.rows);
    } catch (error) {
      // Handle error
      console.error('Error fetching row data:', error);
    }
  };

  const handleFilter = () => {
    // Filter rows based on date range
    // ... (your existing date range filtering logic)
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className='cellAction'>
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
          </div>
        )
      }
    }
    // Add more action columns if needed
  ];

  return (
    <div className='datatable'>
      <div className="datatableTitle">
        View Products
        <DateRangePicker
          onChange={item => setDateRange([item.selection])}
          ranges={dateRange}
        />
        <button onClick={handleFilter}>Apply Filter</button>
      </div>
      <DataGrid
        rows={filteredRows}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[7, 5]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
