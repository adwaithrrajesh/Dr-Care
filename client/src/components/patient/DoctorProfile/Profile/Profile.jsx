import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useLocation } from "react-router-dom";
import { useState } from "react";


const Profile = () => {

  const location = useLocation()

  const [profileImage,setProfileImage] = useState()

  useEffect(() => {
    setProfileImage(location.state.profilePhoto)
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
    </div>
  );
};

export default Profile;
