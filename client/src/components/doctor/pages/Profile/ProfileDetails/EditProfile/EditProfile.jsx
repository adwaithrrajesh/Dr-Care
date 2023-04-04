import React from "react";

const EditProfile = () => {
  return (
    <div>
      <div className="rounded-t-3xl h-[480px] mt-36 w-full bg-blue-100">
        <div className="rounded-full h-1 w-full">
          <p className="text-3xl text-center pt-4">About</p>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-1/2 m">
              First Name
            </p>
            <p className="flex text-end  items-center justify-end w-1/2 ">
              Demo
            </p>
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" className="h-5 pl-3" alt="" />
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-1/2 m">
             Last Name
            </p>
            <p className="flex text-end  items-center justify-end w-1/2 ">
              Demo
            </p>
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" className="h-5 pl-3" alt="" />
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Department
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              Counselling
            </p>
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" className="h-5 pl-3" alt="" />
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Experience
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              2 years
            </p>
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" className="h-5 pl-3" alt="" />
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Fee
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
            ₹200
            </p>
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" className="h-5 pl-3" alt="" />
          </div>
        </div>

        <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
          <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
            <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
              Email
            </p>
            <p className="flex text-end  items-center justify-end w-full ">
              Demo@gmail.com
            </p>
            <img src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png" className="h-5 pl-3" alt="" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditProfile;
