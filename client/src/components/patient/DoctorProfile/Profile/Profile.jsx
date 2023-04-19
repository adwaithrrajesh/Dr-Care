import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import { useState } from "react";


const Profile = () => {

  const navigate = useNavigate();
  const location = useLocation()

  const [profileImage,setProfileImage] = useState()
  const [doctorId,setDoctorId] = useState()

  useEffect(() => {
    setProfileImage(location.state.profilePhoto)
    setDoctorId(location.state._id)
  }, []);



  return (
    <div>
      <div class=" h-48 flex flex-col justify-center items-center mt-36">
        <img
          src={profileImage}
          class="block h-48 w-48  rounded-full object-cover"
          alt=""
        />
      </div>
      <div class=" flex flex-col justify-center items-center">
        <h6 class="text-gray-700 text-lg mt-16">Demo</h6>

        <p class="text-gray-400 mt-2 text-sm">Child Specialist</p>
      </div>

      <div class=" flex items-center justify-center">
      <div class=" flex justify-center items-center">
      <img src="https://icons-for-free.com/download-icon-chat+icon-1320184411998302345_256.png" onClick={()=>navigate('/chat')}  className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out duration-200" alt="" />
        <img src="https://www.pngitem.com/pimgs/m/76-762567_vector-bible-free-book-icon-round-png-transparent.png" onClick={()=>navigate('/book',{state:doctorId})} className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out duration-200" alt="" />
      </div>
      </div>
    </div>
  );
};

export default Profile;
