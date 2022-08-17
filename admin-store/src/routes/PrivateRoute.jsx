import React from 'react';
import { Navigate, Outlet  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../store/auth-slice';
import SideBar from '../components/Navbar/SideBar';
const PrivateRoute = () => {
const token = useSelector(getToken);

      if(token === null){
          return <Navigate to="/" replace/> 
      }

      return(
        <div className='d-flex flex-column'>
          <div>
          <SideBar/>
          </div>
          <div>
          <Outlet/>  
          </div>
        </div>
      )
    
};

export default PrivateRoute;