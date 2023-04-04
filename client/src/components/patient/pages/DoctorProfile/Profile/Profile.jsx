import React from "react";
import {useNavigate} from "react-router-dom"

const Profile = () => {

  const navigate = useNavigate();

  const BackgroundImage =
    "https://media.istockphoto.com/id/638377134/photo/doctor-man-with-stethoscope-in-hospital.jpg?s=612x612&w=0&k=20&c=xldnHCxhAhi4VYWsrucaABm_jyUcn9vN1Azh2XcLQ_0=";
  const DoctorImage =
    "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*";
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

        <p class="text-gray-400 mt-2 text-sm">Child Specialist</p>
      </div>

      <div class=" flex items-center justify-center">
      <div class=" flex justify-center items-center">
      <img src="https://icons-for-free.com/download-icon-chat+icon-1320184411998302345_256.png" onClick={()=>navigate('/chat')}  className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out duration-200" alt="" />
        <img src="https://www.pngitem.com/pimgs/m/76-762567_vector-bible-free-book-icon-round-png-transparent.png" onClick={()=>navigate('/book')} className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out duration-200" alt="" />
      </div>
      </div>
    </div>
  );
};

export default Profile;
