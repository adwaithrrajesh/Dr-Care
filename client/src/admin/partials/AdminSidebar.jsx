import React from "react";
import { useState } from "react";
import control from "../assets/control.png";

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen bg-blue-100 relative`}>
        <img
          src={control}
          alt="Admin Logo"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-cyan-500 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center mt-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5322/5322056.png"
            alt="admin logo"
            className={`cursor-pointer duration-500 h-16 mt-1 ${open && "rotate-[360deg]"}`}
          />
          <h1
            className={`text-black origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}>
            Admin
          </h1>
        </div>
        <ul className="mt-20">

          <li className="text-gray-500 h-[55px] text-sm flex items-center gap-x-4 cursor-pointer p2  hover:bg-blue-50 hover:text-cyan-500 rounded-2xl mt-10">
            <img
              src="https://www.freeiconspng.com/thumbs/dashboard-icon/dashboard-icon-3.png"
              className="rounded-full h-10 ml-3"
              alt="dashboard"
            />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>Dashboard</span>
          </li>

          
          <li className="text-gray-500 h-[55px] text-sm flex items-center gap-x-4 cursor-pointer p2  hover:bg-blue-50 hover:text-cyan-500 rounded-2xl mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
              className="rounded-full h-10 ml-3"
              alt="dashboard"
            />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>Doctors</span>
          </li>

          <li className="text-gray-500 h-[55px] text-sm flex items-center gap-x-4 cursor-pointer p2  hover:bg-blue-50 hover:text-cyan-500 rounded-2xl mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png"
              className="rounded-full h-10 ml-3"
              alt="dashboard"
            />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>Patients</span>
          </li>

          <li className="text-gray-500 h-[55px] text-sm flex items-center gap-x-4 cursor-pointer p2  hover:bg-blue-50 hover:text-cyan-500 rounded-2xl mt-4">
            <img
              src="https://cdn0.iconfinder.com/data/icons/insurance-flat-unexpected-situations/512/Outpatient_Department-512.png"
              className="rounded-full h-10 ml-3"
              alt="dashboard"
            />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>Departments</span>
          </li>

          <li className="text-gray-500 h-[55px] text-sm flex items-center gap-x-4 cursor-pointer p2  hover:bg-blue-50 hover:text-cyan-500 rounded-2xl mt-4">
            <img
              src="https://png.pngtree.com/png-vector/20190505/ourmid/pngtree-vector-logout-icon-png-image_1023261.jpg"
              className="rounded-full h-10 ml-3"
              alt="dashboard"
            />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>Logout</span>
          </li>

        </ul>
      </div>
  );
};

export default AdminSidebar;
