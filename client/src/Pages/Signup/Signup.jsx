import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/action.js';
import './Signup.css';

const Signup = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !city || !state || !country || !password) {
      alert('All fields are required.');
      return;
    }
    dispatch(signup({
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      password,
    }));
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h2>Sign Up</h2>
      </div>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

          <label htmlFor="phone">Mobile</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your mobile number" />

          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />

          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" />

          <label htmlFor="state">State</label>
          <input type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your state" />

          <label htmlFor="country">Country</label>
          <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />

          <button type="submit" className="signup-submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
