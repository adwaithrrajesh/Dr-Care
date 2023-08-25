import React from "react";
import logo from '../../assets/logo.png'

const DoctorFooter = () => {
  return (
    <div>
      <div className="bg-blue-50 max-w-[2000px] h-[300px] px-10 text-center rounded-3xl justify-center mt-2">
        <div className="flex flex-col justify-center items-center mb-5">
          <img src={logo} className="h-12 mt-8" alt="logo" />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <h1>Contact us</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>+91 7994734828</p>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <p>adwaithrrajesh.k@gmail.com</p>
        </div>
        <div className="flex  justify-center items-center">
        <img src='https://cdn-icons-png.flaticon.com/512/174/174855.png' className="h-8 mt-8 " alt="logo" />
        <img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' className="h-8 mt-8 ml-3 mr-3" alt="logo" />
        <img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' className="h-8 mt-8 " alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default DoctorFooter;
