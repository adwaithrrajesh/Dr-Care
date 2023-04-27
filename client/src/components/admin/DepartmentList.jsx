import React, { useState } from 'react';
import { useEffect } from 'react';
import instance from '../../instance/instance';
import "../../styles/tablestyle.css";
import {toast} from 'react-hot-toast'

const DepartmentList = () => {

      const [department,setDepartment] = useState([])
      const [reload,setReload] = useState(false)

      useEffect(() => {
          instance.get('/admin/viewDepartments').then((response)=>{
              setDepartment(response.data.departments)
          })
      }, [reload]);

      const hideDepartment = (departmentId) =>{
        Swal.fire({
          title: 'Hide Department',
          text: "Are you sure want to Hide Department",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Hide'
        }).then((result) => {
          if (result.isConfirmed) {
          instance.post('/admin/hideDepartment',{departmentId}).then((response)=>{
          toast.success(response.data.message)
          setReload(response)
        }).catch((error)=>{
          toast.error(error.response.data.message)
        })
          }
        })
        
      }
      const showDepartment = (departmentId)=>{
        Swal.fire({
          title: 'Show Department',
          text: "Are you sure want to show Department",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Show'
        }).then((result) => {
          if (result.isConfirmed) {
            instance.post('/admin/showDepartment',{departmentId}).then((response)=>{
              setReload(response)
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
            <img src="https://static.vecteezy.com/system/resources/previews/005/411/889/original/syringe-illustration-object-medical-tools-flat-cartoon-style-suitable-for-icon-web-landing-page-banner-flyer-sticker-card-background-t-shirt-clip-art-free-vector.jpg" className="h-24 rounded-full" alt="" />
        </div>
        <p className='text-3xl text-center pt-4'>Department Management</p>

      <div class="container">
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead class="text-white">



          {department.map(() => (
            <tr class="bg-blue-300 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
               <th class="p-3 text-left w-[100px] h-16">Image</th>
               <th class="p-3 text-left w-[260px]">Name</th>
               <th class="p-3 text-left">Description</th>
               <th class="p-3 text-left w-1/6">Action</th>
           </tr>
            ))}
            

          </thead>
          <tbody class="flex-1 sm:flex-none">

          {department.map((department) => (
            <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td class="border-grey-light border hover:bg-gray-100 p-3">
                <img src={department.departmentImage} className='rounded-full h-10' alt="" />
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                {department.departmentName}
              </td>
              <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
                {department.departmentDiscription}
              </td>
              {
                department.show ?<td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer" onClick={()=>{hideDepartment(department._id); setReload(!reload,"i")}}>
                Hide
              </td> :
              <td class="border-grey-light border hover:bg-gray-100 p-3 text-green-400 hover:text-green-600 hover:font-medium cursor-pointer" onClick={()=>{showDepartment(department._id); setReload(!reload,"1")}}>
              Show
             </td>
              }
              
            </tr>
            ))}



          </tbody>
        </table>
      </div>
    </div>
    );
}

export default DepartmentList;
