import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateuser, fetchDetails } from '../../redux/action';
import './UpdateUser.css'
const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const userDetails = useSelector((state) => state.details);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    dispatch(fetchDetails(storedToken));
  }, [dispatch]);

  useEffect(() => {
    if (userDetails) {
      const userId = localStorage.getItem('userId');
      const loggedInUser = userDetails.find(user => user._id === userId);
      if (loggedInUser) {
        setName(loggedInUser.name);
        setEmail(loggedInUser.email);
        setPhone(loggedInUser.phone);
        setAddress(loggedInUser.address);
        setCity(loggedInUser.city);
        setState(loggedInUser.state);
        setCountry(loggedInUser.country);
        if (loggedInUser.image) {
          setImageUrl(loggedInUser.image);
        }
        console.log('Logged-in user details:', loggedInUser);
      }
    }
  }, [userDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('image', image);

    dispatch(updateuser(formData, token));

    if (loading) {
      console.log('Updating user details...');
    } else if (!loading && !error) {
      console.log('User details updated successfully!');
      alert('User details updated successfully!');
      navigate('/userprofile');
    } else if (error) {
      console.error('Failed to update user:', error);
      alert('Failed to update user details.');
    }
  };

  return (
    <>
      <h1>Update User</h1>
      <div className='updatepage'>
        <div className="userdetails">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="Name"> Name </label>
            <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
            <label htmlFor="Email">Email</label>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
            <label htmlFor="phone">Mobile</label>
            <input type="numeric" placeholder='Enter your mobilenumber' value={phone} onChange={(e) => setPhone(e.target.value)} /><br /><br />
            <label htmlFor="Address">Address</label>
            <input type="text" placeholder='Enter your Address' value={address} onChange={(e) => setAddress(e.target.value)} /><br /><br />
            <label htmlFor="city">City</label>
            <input type="text" placeholder='Enter your City' value={city} onChange={(e) => setCity(e.target.value)} /><br /><br />
            <label htmlFor="state">State</label>
            <input type="text" placeholder='Enter your state' value={state} onChange={(e) => setState(e.target.value)} /><br /><br />
            <label htmlFor="country">Country</label>
            <input type="text" placeholder='Enter your Country' value={country} onChange={(e) => setCountry(e.target.value)} /><br /><br />
            <label>Update Image</label>
            <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
            {imageUrl && <img src={imageUrl} alt="Profile" />}
            <div className="submit">
              <button type="submit">Update</button>
              <Link to="/userprofile">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
