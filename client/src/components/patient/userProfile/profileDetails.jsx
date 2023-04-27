import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../instance/instance';
import { toast } from 'react-hot-toast';
import { getProfileDetails } from '../../../API/user';

const ProfileDetails = () => {

    const token = JSON.parse(localStorage.getItem("clientToken"));

    const [user,setUser] = useState()

    useEffect(() => {
        getData ()
    }, [])

    const getData = async() =>{
      const response = await getProfileDetails()
      setUser(response.data.userDetails)
    }



    return (
        <div>
        <div class=" h-48 flex flex-col justify-center items-center mt-24">
          <img
          src={user?.profilePhoto}
            class="block h-48 w-48 rounded-full object-cover"
            alt=""
          />
        </div>
        <div class=" flex flex-col justify-center items-center">
          <h6 class="text-gray-700 text-lg mt-12">{user?.firstName} {user?.lastName}</h6>
        </div>

        <div>
        
        <div className="rounded-t-3xl h-[430px] mt-36 w-full bg-blue-100">
            <div className="rounded-full h-1 w-full">
              <p className="text-3xl text-center pt-4">About</p>
            </div>
  
            <Link className="rounded-full h-1 w-full" to={'/editProfile'}>
              <p className="text-right mr-8 text-blue-500 pt-4">Edit Profile</p>
            </Link>
            
  
            <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-14 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className="flex text-start text-cyan-800 items-center justify-start w-1/2 m">
                  First Name
                </p>
                <p className="flex text-end  items-center justify-end w-1/2 ">
                  {user?.firstName}
                </p>
              </div>
            </div>
  
            <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
                  LastName
                </p>
                <p className="flex text-end  items-center justify-end w-full">
                  {user?.lastName}
                </p>
              </div>
            </div>
  
  
            <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
                  Email
                </p>
                <p className="flex text-end  items-center justify-end w-full ">
                  {user?.email}
                </p>
              </div>
            </div>
  
  
  
            <div className="rounded-2xl ml-2 h-14 w-[99%] bg-blue-50 mt-6 hover:bg-blue-200">
              <div className="flex items-center justify-start leading-tight p-2 md:p-4 w-100">
                <p className="flex text-start text-cyan-800 items-center justify-start w-10 ">
                  PhoneNumber
                </p>
                <p className="flex text-end  items-center justify-end w-full ">
                  +91 {user?.phoneNumber}
                </p>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    );
}

export default ProfileDetails;
