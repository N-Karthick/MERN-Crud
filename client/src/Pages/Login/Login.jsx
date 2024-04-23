import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getotp, userlogin } from '../../redux/action'; 
import './Login.css'; 

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const token = useSelector((state) => state.token);
  const userId = useSelector((state)  => state.userId);
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    dispatch(userlogin({ email, password }));
    setShowOtpInput(true);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert('Please enter correct OTP.');
      return;
    }
    dispatch(getotp({ email, password, otp }));
    
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    navigate('/user/:userId');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login Form</h2>
        <form onSubmit={showOtpInput ? handleVerifyOTP : handleLoginClick}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {showOtpInput && (
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
              />
            </div>
          )}
          {!showOtpInput && (
            <button type="button" onClick={handleLoginClick} className="submit-btn">
              Verify
            </button>
          )}
          {showOtpInput && (
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          )}
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="signup-link">
          <h4>Not registered yet?</h4>
          <Link to="/signup">Sign Up Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
