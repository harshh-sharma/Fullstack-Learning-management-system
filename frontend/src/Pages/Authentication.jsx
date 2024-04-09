import React from 'react'
import {useSelector} from "react-redux";
import {Navigate,Outlet} from "react-router-dom";

const Authentication = ({allowedRoles}) => {
    console.log(allowedRoles);
    const {isLoggedIn,role} = useSelector(store => store?.auth);
    console.log(isLoggedIn,role);
    console.log("r",allowedRoles[0] === "ADMIN");

  return isLoggedIn && allowedRoles.find(myrole => myrole === role) ? (
    <Outlet/>
  ) : isLoggedIn ? (<Navigate to={"/denied"} />) : <Navigate to={"/login"}/>
}

export default Authentication;