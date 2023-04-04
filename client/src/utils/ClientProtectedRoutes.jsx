import React, { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import instance from "../components/patient/instance/instance";


const ClientProtectedRoutes = () => {

  const clientToken = JSON.parse(localStorage.getItem("clientToken"));

  return(
    clientToken ?  <Outlet/> :  <Navigate to="/login"/>
  )

  
//   if (clientToken) {
//     instance.get("/tokenVerify", {
//         headers: {
//           Authorization: `Bearer ${clientToken}`,
//         },
//       })
//       .then((response) => {

//       })
//       .catch((error) => {
//         localStorage.clear();
//         window.location.reload() 
//         return <Navigate to ={"/login"}></Navigate>
//       });
//   }else{
//     return <Navigate to={"/login"}></Navigate>
//   }
};

export default ClientProtectedRoutes;
