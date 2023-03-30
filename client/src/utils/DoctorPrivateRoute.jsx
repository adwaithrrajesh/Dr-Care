import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const DoctorProtectedRoutes = () => {
    
const clientToken = JSON.parse(localStorage.getItem('doctorToken'))

return (
    clientToken ? <Outlet/> : <Navigate to="/doctor/login"/> 
)
   

}

export default DoctorProtectedRoutes