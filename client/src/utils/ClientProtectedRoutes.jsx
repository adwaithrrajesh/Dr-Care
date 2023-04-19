import React, {useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import instance from '../../src/instance/instance'


const ClientProtectedRoutes = () => {

  const clientToken = JSON.parse(localStorage.getItem("clientToken"));
  const navigate = useNavigate()
  const [client,setClient] = useState(false)
 
  useEffect(() => {
    instance.get("/tokenVerify", {
      headers: {Authorization: `Bearer ${clientToken}`,}}).then((response)=>{
      setClient(true)
    }).catch((error)=>{
      localStorage.clear()
      navigate('/login')
    })

  }, []);


  return(
    client && <Outlet/>
  )

  
  
};

export default ClientProtectedRoutes;
