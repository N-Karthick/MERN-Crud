import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import axios from 'axios';

// Action Types
const FETCH_DETAILS_REQUEST = 'FETCH_DETAILS_REQUEST';
const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';
const FETCH_DETAILS_FAILURE = 'FETCH_DETAILS_FAILURE';
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
const FETCH_DELETEUSER_REQUEST = 'FETCH_DELETEUSER_REQUEST';
const FETCH_DELETEUSER_SUCCESS = 'FETCH_DELETEUSER_SUCCESS';
const FETCH_DELETEUSER_FAILURE = 'FETCH_DELETEUSER_FAILURE';
const UPDATE_DETAILS_SUCCESS = 'UPDATE_DETAILS_SUCCESS';
const DELETE_DETAILS_SUCCESS = 'DELETE_DETAILS_SUCCESS';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const OTP_SUCCESS = 'OTP_SUCCESS';
const OTP_REQUEST = 'OTP_REQUEST';
const OTP_FAILURE = 'OTP_FAILURE';
const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const PROFILE_REQUEST = 'PROFILE_REQUEST';
const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const PROFILE_FAILURE = 'PROFILE_FAILURE';
const userId = localStorage.getItem('userId');

// Action Creators
const fetchDetailsRequest = () => ({ type: FETCH_DETAILS_REQUEST });
const fetchDetailsSuccess = (details) => ({ type: FETCH_DETAILS_SUCCESS, payload: details });
const fetchDetailsFailure = (error) => ({ type: FETCH_DETAILS_FAILURE, payload: error });
const fetchUserFailure = (error) => ({ type: FETCH_USER_FAILURE, payload: error });
const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
const fetchUserSuccess = (userdetails) => ({ type: FETCH_USER_SUCCESS, payload: userdetails });
const updateDetailsSuccess = (updatedDetails) => ({ type: UPDATE_DETAILS_SUCCESS, payload: updatedDetails });
const deleteDetailsSuccess = (deletedDetailsId) => ({ type: DELETE_DETAILS_SUCCESS, payload: deletedDetailsId });
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });
const otpRequest = () => ({ type: OTP_REQUEST });
const otpSuccess = (user) => ({ type: OTP_SUCCESS, payload: user });
const otpFailure = (error) => ({ type: OTP_FAILURE, payload: error });
const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

// Async Action Creator
export const fetchDetails = (details) => {
  return async (dispatch) => {
    dispatch(fetchDetailsRequest());
    try {
      const response = await axios.get('http://localhost:4004/userdetails/', details);
      dispatch(fetchDetailsSuccess(response.data));
    } catch (error) {
      dispatch(fetchDetailsFailure(error.message));
    }
  };
};

export const updateuser = (updatedDetails, token, userId) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Id': userId,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await axios.put(`http://localhost:4004/updateuser/${userId}`, updatedDetails, config);
      dispatch(updateDetailsSuccess(response.data));
    } catch (error) {
      dispatch(fetchDetailsFailure(error.message));
    }
  };
};

export const deleteDetails = (userId, token) => {

  return async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Id': userId,
        },
      };
      await axios.delete(`http://localhost:4004/deleteuser/${userId}`, config);
      dispatch(deleteDetailsSuccess(userId));
    } catch (error) {
      dispatch(fetchDetailsFailure(error.message));
    }
  };
};

export const getotp = (credentials) => {
  return async (dispatch) => {
    dispatch(otpRequest());
    try {
      const response = await axios.post('http://localhost:4004/getotp', credentials);
      const { token, userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      dispatch(otpSuccess(response.data));
    } catch (error) {
      dispatch(otpFailure(error.message));
    }
  };
};

export const userlogin = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:4004/userlogin', credentials);
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const signup = (userInfo) => {
  return async (dispatch) => {
    dispatch(signupRequest());
    try {
      const response = await axios.post('http://localhost:4004/userregister', userInfo);
      dispatch(signupSuccess(response.data));
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
};

// export const  fetchUserData = () => async (dispatch) => {
//   try {
//     const response = await axios.get('http://localhost:4004/user/:userId'); 
//         dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
//   } catch (error) {
//     dispatch({ type: 'FETCH_USER_FAILURE', payload: error.message });
//   }
// };

export const content = (userdetails) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'userId': `${localStorage.getItem('userId')}`,
        },
      };
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:4004/user/${userId}`, userdetails, config);
      dispatch(fetchUserSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
      console.error('Error fetching user details :', error.response?.data || error.message);
    }
  }
}

// Reducer
const initialState = {
  userdetail: [],
  user: [],
  details: [],
  loading: false,
  error: null,
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAILS_REQUEST:
      return { ...state, loading: false, error: null };
    case FETCH_DETAILS_SUCCESS:
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, details: action.payload, error: null };
    case FETCH_DELETEUSER_SUCCESS:
      return { ...state, loading: false, detail: action.payload, error: null };
    case FETCH_DETAILS_FAILURE:
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, details: [], error: action.payload };

    case DELETE_DETAILS_SUCCESS:
      return { ...state, deletedUserDetails: action.payload };

    case UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        details: state.details.map((detail) => (detail.id === action.payload.id ? action.payload : detail)),
        error: null,
      };
    case DELETE_DETAILS_SUCCESS:
      return {
        ...state,
        details: state.details.filter((detail) => detail.id !== action.payload),
        error: null,
      };
    case OTP_REQUEST:
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case OTP_SUCCESS:
    case SIGNUP_SUCCESS:
    case PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_FAILURE:
    case OTP_FAILURE:
    case SIGNUP_FAILURE:
    case PROFILE_FAILURE:
      return { ...state, loading: false, user: null, error: action.payload };
    default:
      return state;
  }
};



const store = createStore(detailsReducer, applyMiddleware(thunk));

export default store;