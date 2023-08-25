import React, { useEffect, useState } from "react";
import { getDepartmentForHomeScreen } from "../../../API/user";
import { useNavigate } from "react-router-dom";
import './department.css'


const Departments = () => {


  const [departments,setDepartments] = useState([])
  const [departmentDetails,setDepartmentDetails] = useState()
  const[loading,setLoading] = useState(false)

  const navigate = useNavigate()



  useEffect(() => {
    getDepartments()
  }, []);

  const getDepartments = async() =>{
    setLoading(true)
    const response = await getDepartmentForHomeScreen()
    setDepartments(response.data.departmentData)
    setLoading(false)
  }

  const handleDepartment  = (departmentId) =>{
    const result = departments.find(department => department._id === departmentId)
    setDepartmentDetails(result)
  }




  return (
    <section className='departmentSection mt-5'>
    <div className='w-full flex justify-center mt-3'>
      <div className="justify-center w-2/3 ">
      <h1 className='text-cyan-800 text-3xl font-bold'>Top Departments</h1></div>
      </div>
  
    <div className="department-container bg-white border rounded-lg p-8">
        <div className="department-list mt-2 text-sm">
            <ul className="list flex justify-center flex-wrap w-1/2">
              {
                departments.map((department)=>(
                <li onClick={()=>handleDepartment(department._id)} className=" h-14 mb-4 rounded-lg bg-gray-200 text-blue-900 font-medium cursor-pointer transition duration-200 ease-in-out hover:bg-cyan-400 hover:text-white">{department.departmentName}</li>
                ))
              }
            </ul>
        </div>
        
        <div className="flex-1  justify-center ">
          {
            departmentDetails ?
            <div className=" flex flex-col justify-center  ">
                    <div className="department-image mb-8  hidden sm:block">
                        <img src={departmentDetails.departmentImage} className="rounded-lg" />
                    </div>

                    <p className=" text-cyan-900   text-lg  font-medium">This is one of the popular treatment in our clinic . {departmentDetails.departmentDiscription}</p>

                    <div className="justify-start  flex mt-4">
                    <button onClick={()=>navigate('/doctors',{state:{departmentData: departmentDetails.departmentName}})} class="bg-cyan-800 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-2xl">
                    Find Doctors
                   </button>
                    </div>
            </div>
            :
            <div className="department-content flex flex-col">
            <div className="department-image mb-8  hidden sm:block">
                <img src="https://cdn-icons-png.flaticon.com/512/889/889803.png" className="rounded-lg" />
            </div>
            <div>
            <p className=" text-cyan-900 text-lg font-medium">Click on a department to see details</p>
            </div>
           </div>
          }

        </div>
    </div>
</section> 
  );
};

export default Departments;
