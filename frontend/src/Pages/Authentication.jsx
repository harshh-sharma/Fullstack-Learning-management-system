import React from 'react'
import {useSelector} from "react-redux";
import {Navigate,Outlet} from "react-router-dom";

const Authentication = ({allowedRoles}) => {
    const adminRoles = `"${allowedRoles}"`;
    const {isLoggedIn,role} = useSelector(store => store?.auth);

  return (isLoggedIn && adminRoles === role) ? (
    <Outlet/>
  ) : isLoggedIn ? (<Navigate to={"/denied"} />) : <Navigate to={"/login"}/>
}

export default Authentication;