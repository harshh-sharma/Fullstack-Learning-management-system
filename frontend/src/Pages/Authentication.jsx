import React from 'react'
import {useSelector} from "react-redux";
import {Navigate,Outlet} from "react-router-dom";

const Authentication = ({allowedRoles}) => {
    console.log(allowedRoles);
    const adminRoles = `"${allowedRoles[0]}"`;
    const userRoles = `"${allowedRoles[1]}"`;
    console.log(userRoles);
    console.log(adminRoles);
    const {isLoggedIn,role} = useSelector(store => store?.auth);

  return (isLoggedIn && adminRoles === role) ? (
    <Outlet/>
  ) : isLoggedIn ? (<Navigate to={"/denied"} />) : <Navigate to={"/login"}/>
}

export default Authentication;