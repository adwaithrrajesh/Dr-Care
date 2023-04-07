import React, { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import instance from "../instance/instance";


const AdminProtectedRoute = () => {

    const adminToken = JSON.parse(localStorage.getItem("adminToken"));
    const [admin,setAdmin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      instance.get('/admin/tokenVerify',{
        headers:{
          Authorization: `Bearer ${adminToken}`
        }
      }).then((response)=>{
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
