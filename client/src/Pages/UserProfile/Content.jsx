import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, LinearProgress, Skeleton, Stack } from '@mui/material';

const SingleUserComponent = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const storedUserId = localStorage.getItem('userId');
  const fetchUserId = storedUserId || userId;
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const fetchUserId = storedUserId || userId;
    const fetchUserData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'UserId': storedUserId,
      };
      try {
        setTimeout(async () => {
          const response = await axios.get(`http://localhost:4004/user/${fetchUserId}`, headers);
          setUserData(response.data.user);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user details:', error.response?.data || error.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <div className='user-content'>
      <div>
        <hr />
        {userData ? (
          <div className='user-information'>
            <h1 style={{ textAlign: 'center', fontStyle: 'italic' }}>{userData.name}</h1>
            <hr />
            <p>
              {userData.image && (
                <img
                  src={userData.image}
                  alt={`Image of ${userData.name}`}
                  style={{ width: '12rem', height: '12rem', borderRadius: '50%', position: 'absolute', left: '72%', top: '23%' }}
                />
              )}
            </p>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}><EmailOutlinedIcon />: {userData.email}</h3>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}><PhoneIcon />: {userData.phone}</h3>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}><HomeIcon />: {userData.address}</h3>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}><LocationCityIcon />: {userData.city}</h3>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}><LanguageIcon />: {userData.country}</h3>
          </div>
        ) : (
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="circular" width={50} height={60} />
            <Skeleton variant="rectangular" width={610} height={90} />
            <Skeleton variant="rounded" width={610} height={90} />
          </Stack>
        )}
        <div className="user-action">
          <Link style={{ width: 20, display: 'flex', alignItems: 'center' }} to={`/updateuser/${userId || fetchUserId }`}><EditIcon /> Edit-Profile</Link><br />
          <Link style={{ width: 20, display: 'flex', alignItems: 'center' }} to={`/deleteuser/${userId || fetchUserId}`}><DeleteIcon /> Delete-Profile</Link>
        </div>
      </div>
      <br /><hr />
    </div>
  );
};

export default SingleUserComponent;
