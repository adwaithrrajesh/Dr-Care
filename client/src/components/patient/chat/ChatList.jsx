import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChattableDoctors } from "../../../API/user";


const ChatListDetails = () => {

// ----------------------------------------------------------------GETTING NECESSARY THINGS-------------------------------------------------------------------//

  const navigate = useNavigate()
  const [doctors,setDoctors] = useState([])
  const [loading,setLoading] = useState(false)

// ----------------------------------------------------------------GETTING DOCTOR-------------------------------------------------------------------//

  useEffect(() => {
    getDoctorList()
  }, []);

  const getDoctorList = async() =>{
    setLoading(true)
    const response = await getChattableDoctors()
    setLoading(false)
    setDoctors(response?.data?.chattableDoctors)
  }

// --------------------------------------------------------------------CODE-------------------------------------------------------------------//


  return (
    <div>
           {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
  <div class="flex justify-center w-full mt-1">
          <img
            src="https://img.freepik.com/premium-vector/blue-chat-speech-bubble-icon-3d-cartoon-minimal-style-vector-illustration_275806-1726.jpg"
            alt=""
            className="h-80"
          />
        </div>

      <ul role="list" class="divide-y divide-gray-100">
        {doctors?.map((doctor)=>(
  <li onClick={()=>navigate('/chat',{state:doctor._id})} class="flex justify-between gap-x-6 py-5 mt-1 bg-gray-100 shadow-sm hover:bg-blue-100 rounded-xl" >
    <div class="flex gap-x-10">
      <img class="h-12 w-12 flex-none ml-4 object-cover rounded-full bg-gray-50" src={doctor.profilePhoto} alt="doctor Profile photo" />
      <div class="min-w-0 flex-auto">
        <p class="text-sm md:text-lg lg:text-xl font-semibold leading-6 text-gray-900">{doctor.firstName} {doctor.lastName}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{doctor.email}</p>
      </div>
    </div>
    <div class="mr-10 hidden sm:flex sm:flex-col sm:items-end">
      <p class="text-sm leading-6 md:text-lg lg:text-xl text-gray-900">{doctor.departmentName}</p>
      <p class="mt-1 text-xs leading-5 text-gray-500">Experience : {doctor.experience} years</p>
    </div>
  </li>
          ))
        }

</ul>
   </div>
  );
};

export default ChatListDetails;
