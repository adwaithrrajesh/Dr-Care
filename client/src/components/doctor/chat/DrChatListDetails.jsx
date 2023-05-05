import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {getChattableUsers} from '../../../API/doctor'

const DoctorChatListDetails = () => {
  
  const navigate = useNavigate()

  const [patient,setPatient] = useState([])

  useEffect(() => {
    getChat()
  }, []);

  const getChat = async() =>{
    const response = await getChattableUsers()
    setPatient(response.data.chattableUsers)
  }


    return (
        <div>
             <div>
  <div class="flex justify-center w-full mt-1">
          <img
            src="https://img.freepik.com/premium-vector/blue-chat-speech-bubble-icon-3d-cartoon-minimal-style-vector-illustration_275806-1726.jpg"
            alt=""
            className="h-80"
          />
        </div>

      <ul role="list" class="divide-y divide-gray-100">

        {
          patient?.map((data)=>(
 <li onClick={()=>navigate('/doctor/chat',{state:data._id})} class="flex justify-between gap-x-6 py-5 mt-1 bg-gray-100 shadow-sm hover:bg-blue-100 rounded-xl" >
    <div class="flex gap-x-10">
      <img class="h-12 w-12 flex-none ml-4 rounded-full object-cover bg-gray-50" src={data.profilePhoto} alt="" />
      <div class="min-w-0 flex-auto">
        <p class="text-sm md:text-lg lg:text-xl font-semibold leading-6 text-gray-900">{data.firstName} {data.lastName}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{data.email}</p>
      </div>
    </div>
  </li>
          ))
        }
 



</ul>
   </div>
        </div>
    );
}

export default DoctorChatListDetails;
