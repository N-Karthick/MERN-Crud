import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDetails } from './redux/action';
import Userprofile from './Pages/UserProfile/Userprofile'
import Login from './Pages/Login/Login'
import Signup  from './Pages/Signup/Signup';
import UpdateUser from  './Pages/UpdateUser/UpdateUser'
import DeleteUser from './Pages/DeleteUser/DeleteUser';
import UserDetailsRedux from './Pages/UserDetails/UserDetailsRedux';
import Content from './Pages/UserProfile/Content';
function App() {
    const route = createBrowserRouter([
        {
          path:"/login/",
          element:<Login/>
        },
        {
          path:"/signup",
          element: <Signup/>
        },
        {
          path:"/",
          element:<UserDetailsRedux/>
        },{
          path: "/updateuser/:Id",
          element:<UpdateUser/>
        },
        {
          path: "/deleteuser/:Id",
          element:<DeleteUser/>
        },
        {
          path:"/user/:Id",
          element:<Content/>
        },
        {
          path:"/userprofile",
          element:<Userprofile/>
        },
      ])
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Errorrrr: {error}</p>;
  }

  return (
    <div>
      <RouterProvider  router={route}>
 <Router>
 
 </Router>
 </RouterProvider>
 </div>
  );
}

export default App;