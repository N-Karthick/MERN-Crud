import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../DeleteUser/DeleteUser.css'
import  { deleteDetails } from '../../redux/action'; 

import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
const DeleteUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const { userId } = useParams();
  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token','userId');
    setToken(storedToken);
  }, []); 

  const handleDelete = async () => {
     dispatch(deleteDetails(userId,token));

    };
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);


    if (!loading && !error && token) {
      alert('Are You Sure to Delete Details...');

      console.log('Details deleted successfully..!');
      
    } else if (error) {
      console.error('Failed to delete user:', error);
    }
    
  return (
    <>
      <h1>Delete User</h1>
      <div className='deletepage'>
        <div className="delete-details">
          <p>Are you sure you want to delete your account?</p>
          <div className="submit">
               <button type="button" onClick={handleDelete}>
        Submit
      </button>
      <Link to="/">Cancel</Link>

          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
