import React, { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import adminInstance from "../instance/adminInstance";


const AdminProtectedRoute = () => {

    const adminToken = JSON.parse(localStorage.getItem("adminToken"));
    const [admin,setAdmin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      adminInstance.get('/admin/tokenVerify').then((response)=>{
        setAdmin(true)
      }).catch((error)=>{
        localStorage.clear()
        navigate('/admin/login')
      })
    }, []);


    return(
      admin &&  <Outlet/> 
    )
}

export default AdminProtectedRoute;
