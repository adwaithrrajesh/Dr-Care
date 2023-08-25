import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import instance from "../../instance/instance";
import "../../styles/tablestyle.css";

const List = () => {
  const [user, setUser] = useState([]);
  const [reload,setReload] = useState()

  useEffect(() => {
    instance.get("/admin/getUsers").then((response) => {
      setUser(response.data.users);
    });
  }, [reload]);

  const blockUser = (userId) =>{
    Swal.fire({
      title: 'Block user',
      text: "Are you sure want to block the user",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block'
    }).then((result) => {
      if (result.isConfirmed) {
      instance.post('/admin/blockUser',{userId}).then((response)=>{
      setReload(!reload,'!')
      toast.success(response.data.message)
    }).catch((error)=>{
      toast.error(error.response.data.message)
    })
      }
    })
  
  }
  const unBlockUser = (userId) =>{
    Swal.fire({
      title: 'Unblock user',
      text: "Are you sure want to unBlock the user",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock'
    }).then((result) => {
      if (result.isConfirmed) {
        instance.post('/admin/unBlockUser',{userId}).then((response)=>{
          setReload(!reload,'!')
          toast.success(response.data.message)
        }).catch((error)=>{
          toast.error(error.response.data.message)
        })
      }
    })
  }

  return (
    <div class="p-4 sm:ml-64">
        <div className="flex items-center justify-center leading-tight p-2 md:p-4  w-100">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiOH80WRk1WEtUqNcwmVf6MfxzLuSQHoojxGD7ge6eAlGyA-ZkL-5mJ99z8n2rsQHlZlo&usqp=CAU" className="h-20" alt="" />
        </div>
        <p className='text-3xl text-center pt-4'>User Management</p>

      <div class="container">
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead class="text-white">

            {user.map((user) => (
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

          {user.map((user) => (
            <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
               <td class="border-grey-light border hover:bg-gray-100 p-3 flex justify-center">
                <img src={user.profilePhoto} className="h-10 rounded" alt="user Profile" />
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3">
                {user.firstName} {user.lastName}
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                {user.email}
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                +91 {user.phoneNumber}
              </td>
              {
                user.block ?
                <td class="border-grey-light border hover:bg-gray-100 p-3 text-green-400 hover:text-green-600 hover:font-medium cursor-pointer" onClick={()=>unBlockUser(user._id)}>
                unBlock
               </td>
              :
                 <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer" onClick={()=>blockUser(user._id)}>
                Block
                </td> 
              }
              
            </tr>
            ))}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
