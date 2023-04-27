import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import instance from "../../../../instance/instance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState("");

  useEffect(() => {
    setDoctor(location.state);
  }, []);

  return (
    <div>
      <div class=" flex flex-col justify-center items-center">
        <h6 class="text-gray-700 text-lg mt-16">{doctor.firstName}{doctor.lastName}</h6>

        <p class="text-gray-400 mt-2 text-sm">{doctor.departmentName}</p>
      </div>

 
        <div class=" flex justify-center items-center mt-2">
          {/* <img
            src="https://icons-for-free.com/download-icon-chat+icon-1320184411998302345_256.png"
            onClick={() => navigate("/chat")}   
            className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out duration-200"
            alt=""
          /> */}
          <img
            src="https://www.pngitem.com/pimgs/m/76-762567_vector-bible-free-book-icon-round-png-transparent.png"
            onClick={() => navigate("/book", { state: doctor._id })}
            className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out duration-200"
            alt=""
          />
        </div>
      

      <div className="rounded-t-3xl h-[550px] mt-36 w-full bg-blue-100">
        <div className="rounded-full h-1 w-full">
          <p className="text-3xl text-center pt-4">About</p>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-1/2 m">
              Name
            </p>
            <p className="flex text-end  items-center justify-end w-1/2 ">
              {doctor?.firstName} {doctor.lastName}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Department
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.departmentName}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Experience
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.experience}years
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Email
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.email}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Fee
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              {doctor.fee}
            </p>
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Phone Number
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              +91 {doctor.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
