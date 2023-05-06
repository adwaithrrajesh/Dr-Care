import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import { useState } from "react";


const Profile = () => {

  const location = useLocation()

  const [profileImage,setProfileImage] = useState()
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    setProfileImage(location.state.profilePhoto)
    setLoading(false)
  }, []);



  return (
    <div>
         {loading && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>}
      <div class=" h-48 flex flex-col justify-center items-center mt-36">
        <img
          src={profileImage}
          class="block h-48 w-48  rounded-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default Profile;
