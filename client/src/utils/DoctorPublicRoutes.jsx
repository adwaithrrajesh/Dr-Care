import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const DoctorPublicRoutes = () => {
    
const clientToken = JSON.parse(localStorage.getItem('doctorToken'))
console.log(clientToken,"bingoooooo")

return (
    clientToken ? <Navigate to="/doctor/home"/> :  <Outlet/>
)
   

}

export default DoctorPublicRoutes