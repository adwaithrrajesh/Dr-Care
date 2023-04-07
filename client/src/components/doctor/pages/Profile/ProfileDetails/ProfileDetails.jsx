import React, { useEffect, useState } from "react";
import instance from "../../../../../instance/instance";
import { Link } from "react-router-dom";

const ProfileDetails = () => {
  const [doctor, setDoctor] = useState([]);
  const doctorToken = JSON.parse(localStorage.getItem("doctorToken"));

  useEffect(() => {
    instance.get("/doctor/doctorDetails", {headers: { Authorization: `Bearer ${doctorToken}` },}).then((response) => {
        setDoctor(response.data.doctorDetails);
      });
  }, []);

  const DoctorImage = doctor.profilePhoto
  return (
    <div>
      <div class=" h-[120px] flex flex-col justify-center items-center  bg-cover">
        <img
          src={DoctorImage}
          className="bg-cover h-36 mt-44 rounded-full"
          alt=""
        />
      </div>
      <div class=" mt-10 flex flex-col justify-center items-center">
        <h6 class="text-gray-700 text-lg mt-16">{doctor.firstName}{doctor.lastName}</h6>
        <p class="text-gray-400 mt-2 text-sm">{doctor.departmentName}</p>
      </div>
      <div>
        <div className="rounded-t-3xl h-[600px] mt-36 w-full bg-blue-100">
          <div className="rounded-full h-1 w-full">
            <p className="text-3xl text-center pt-4">About</p>
          </div>

          <Link className="rounded-full h-1 w-full" to={'/doctor/editProfile'}>
            <p className="text-right mr-8 text-blue-500 pt-4">Edit Profile</p>
          </Link>
          

          <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200">
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
              <p className="flex text-start text-cyan-800 items-center justify-start w-1/2 m">
                First Name
              </p>
              <p className="flex text-end  items-center justify-end w-1/2 ">
                {doctor.firstName}
              </p>
            </div>
          </div>

          <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
              <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
                LastName
              </p>
              <p className="flex text-end  items-center justify-end w-full">
                {doctor.lastName}
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
              ₹{doctor.fee}
              </p>
            </div>
          </div>

          <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
              <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
                Experience
              </p>
              <p className="flex text-end  items-center justify-end w-full ">
                {doctor.experience} years
              </p>
            </div>
          </div>

          <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
            <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
              <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
                PhoneNumber
              </p>
              <p className="flex text-end  items-center justify-end w-full ">
                {doctor.phoneNumber}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
