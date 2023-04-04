import React from "react"
import { Navigate, Outlet } from "react-router-dom"


const AdminProtectedRoute = () => {

    const adminToken = JSON.parse(localStorage.getItem("adminToken"));


    return(
      adminToken ?  <Outlet/> :  <Navigate to="/admin/login"/>
    )
}

export default AdminProtectedRoute;
