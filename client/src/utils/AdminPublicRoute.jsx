import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const AdminPublicRoute = () => {

    const adminToken = JSON.parse(localStorage.getItem("adminToken"));

    return(
      adminToken ?  <Navigate to="/admin"/> : <Outlet/> 
    )
}

export default AdminPublicRoute;
