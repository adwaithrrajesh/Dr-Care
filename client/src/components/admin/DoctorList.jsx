import React from "react";
import { useState, useEffect } from "react";
// import instance from "../../instance/instance";
import adminInstance from "../../instance/adminInstance";
import { toast } from "react-hot-toast";
import "../../styles/tablestyle.css";

const List = () => {

  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState('');


  useEffect(() => {
    adminInstance.get("/admin/getDoctors").then((response) => {
      setDoctor(response.data.doctors);
    });
  }, [reload]);

  const blockDoctor = (doctorId) =>{
    Swal.fire({
      title: 'Block doctor',
      text: "Are you sure want to Block the doctor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block'
    }).then((result) => {
      if (result.isConfirmed) {
      instance.post('/admin/blockDoctor',{doctorId}).then((response)=>{
      setReload(!reload,"1")
      toast.success(response.data.message)
    }).catch((error)=>{
      toast.error(error.response.data.message)
    }) 
      }
    })
  
  }
  const unBlockDoctor = (doctorId) =>{
    Swal.fire({
      title: 'Unblock Doctor',
      text: "Are you sure want to unBlock the Doctor",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock'
    }).then((result) => {
      if (result.isConfirmed) {
    instance.post('/admin/unBlockDoctor',{doctorId}).then((response)=>{
      setReload(!reload,"2")
      toast.success(response.data.message)
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
      }
    })

  }
  

    return(
        <div class="p-4 sm:ml-64">
        <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
            <img src="https://static.vecteezy.com/system/resources/previews/015/412/022/original/doctor-round-avatar-medicine-flat-avatar-with-male-doctor-medical-clinic-team-round-icon-medical-collection-illustration-vector.jpg" 
            className="h-24 rounded-full" alt="" />
        </div>
        <p className='text-3xl text-center pt-4'>Doctor Management</p>

      <div class="container">
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead class="text-white">

            {doctor.map((doctor) => (
               <tr class="bg-blue-300 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
               <th class="p-3 text-left">Profile</th>
               <th class="p-3 text-left">Full Name</th>
               <th class="p-3 text-left">Email</th>
               <th class="p-3 text-left">PhoneNumber</th>
               <th class="p-3 text-left" width="110px">Actions</th>
           </tr>
            ))}

          </thead>
          <tbody class="flex-1 sm:flex-none">

          {doctor.map((doctor) => (
            <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
               <td class="border-grey-light border hover:bg-gray-100 p-3 flex justify-center">
                <img src={doctor.profilePhoto} className="h-10 rounded" alt="user Profile" />
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3">
                {doctor.firstName} {doctor.lastName}
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                {doctor.email}
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                +91 {doctor.phoneNumber}
              </td>
              {
                doctor.block ?
             <td class="border-grey-light border hover:bg-gray-100 p-3 text-green-400 hover:text-green-600 hover:font-medium cursor-pointer" onClick={()=>unBlockDoctor(doctor._id)}>
                Unblock
              </td>
              :
              <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer" onClick={()=>{blockDoctor(doctor._id)}}>
              Block
             </td>
              }
             
            </tr>
            ))}


          </tbody>
        </table>
      </div>
    </div>
        
    )
}

export default List;
