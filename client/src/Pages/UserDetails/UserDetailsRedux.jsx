import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TablePagination } from '@mui/material';
import { fetchDetails, deleteContent, Deleteusercontent } from '../../redux/action'; // Assuming you have these actions imported
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { useParams } from 'react-router-dom';
import './UserDetails.css'

const UserDetailsRedux = () => {
  const dispatch = useDispatch();
  const { details, detail } = useSelector((state) => state); // Assuming you have 'deletedUserDetails' in your Redux store
  const { userId } = useParams();
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [selectedRows, setSelectedRows] = useState([]);
  const [localDetails, setLocalDetails] = useState([]); // Local state for the first table

  useEffect(() => {
    // Fetch user details when the component mounts
    dispatch(fetchDetails());
  }, []);

  useEffect(() => {
    // Update localDetails when details change
    setLocalDetails(details);
  }, [details]);

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = [...prevSelectedRows];
      if (updatedSelectedRows.includes(userId)) {
        updatedSelectedRows.splice(updatedSelectedRows.indexOf(userId), 1);
      } else {
        updatedSelectedRows.push(userId);
      }
      return updatedSelectedRows;
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rows = parseInt(event.target.value, 10);
    setRowsPerPage(rows);
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const slicedDetails = localDetails.slice(startIndex, endIndex);
  const columns = [
    // { field: 'SNO', headerName: 'SNO', flex: 1 },
    { field: '_id', headerName: 'UserId', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
  ];

  return (
    <div>
      <h1 className="heading">User Details</h1>
      <div className="userPage">
        <div className="buttons">
          <Link to="/signup">
            <PersonAddIcon />
          </Link>
          <Link to="/login">
            <LoginIcon />
          </Link>
        </div>
        <div className="userTable">
          {/* Display user details in a table */}
          <table border={1} cellPadding={5} cellSpacing={0}>
            {/* Table header */}
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>{column.headerName}</th>
                ))}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {slicedDetails.map((user, index) => (
                <tr key={index}>
                  {/* <td>{startIndex + index + 1}</td> Serial number (SNO) as index + 1 */}
                  {columns.map((column) => (
                    <td key={column.field}>{user[column.field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          {/* Pagination component */}
          <TablePagination
            rowsPerPageOptions={[3, 5, 10, 25]}
            component="div"
            count={localDetails.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsRedux;
