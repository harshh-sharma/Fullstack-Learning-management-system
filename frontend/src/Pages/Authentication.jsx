import React from 'react'
import {useSelector} from "react-redux";
import {Navigate,Outlet} from "react-router-dom";
import { login } from '../redux/Slices/authSlice';

const Authentication = ({allowedRoles}) => {

    const {isLoggedIn,role} = useSelector(store => store?.auth);

  return (isLoggedIn && allowedRoles.find(myrole => myrole == role)) ? (
    <Outlet/>
  ) : isLoggedIn ? (<Navigate to={"/denied"} />) : <Navigate to={"/login"}/>
}

export default Authentication;