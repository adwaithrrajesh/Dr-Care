import React, { useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import instance from "../../src/instance/instance"

const DoctorProtectedRoutes = () => {
    
const doctorToken = JSON.parse(localStorage.getItem('doctorToken'))
const navigate = useNavigate()
const [doctor,setDoctor] = useState(false)

 
useEffect(() => {
    instance.get("/doctor/verifyToken", {headers: {Authorization: `Bearer ${doctorToken}`}}).then((response)=>{
      setDoctor(true)
    }).catch((error)=>{
        localStorage.clear()
      navigate('/doctor/login')
    })
  }, []);



return(
    doctor && <Outlet/>
)

}

export default DoctorProtectedRoutes