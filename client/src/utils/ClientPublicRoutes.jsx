import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ClientPublicRoutes = () => {
    
const clientToken = JSON.parse(localStorage.getItem('clientToken'))

return (
    clientToken ? <Navigate to="/"/> :  <Outlet/>
)
   

}

export default ClientPublicRoutes