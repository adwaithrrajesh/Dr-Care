import React from "react";
import Rating from "../../Components/rating/Rating";
import EditProfile from "./EditProfile/EditProfile";


const ProfileCoverPhoto = () => {
  const DoctorImage ="https://img.freepik.com/premium-vector/doctor-icon-avatar-white_136162-58.jpg?w=2000";
  return (
    <div>
      <div class=" h-48 flex flex-col justify-center items-center  bg-cover bg-[url('https://media.istockphoto.com/id/638377134/photo/doctor-man-with-stethoscope-in-hospital.jpg?s=612x612&w=0&k=20&c=xldnHCxhAhi4VYWsrucaABm_jyUcn9vN1Azh2XcLQ_0=')]">
        <img
          src={DoctorImage}
          className="bg-cover h-36 mt-44 rounded-full"
          alt=""
        />
      </div>
      <div class=" flex flex-col justify-center items-center">
        <h6 class="text-gray-700 text-lg mt-16">Demo</h6>
        <p class="text-gray-400 mt-2 text-sm">Department</p>
        
        <Rating />

      </div>
    <EditProfile />
    </div>
  );
};

export default ProfileCoverPhoto;
